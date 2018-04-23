import { isFunction } from 'lodash'
import { actionTypes } from '../constants'

const {
  FILE_UPLOAD_ERROR,
  FILE_UPLOAD_PROGRESS,
  FILE_UPLOAD_COMPLETE
} = actionTypes

/**
 * Delete file from Firebase Storage with support for deleteing meta
 * data from database (either Real Time Database or Firestore depending on
 * config)
 * @param {Object} firebase - Internal firebase object
 * @param  {String} path - Path to File which should be deleted
 * @param  {String} dbPath - Path of meta data with Database (Real Time Or
 * Firestore depnding on config)
 * @return {Promise} Resolves with path and dbPath
 */
export const deleteFile = (firebase, { path, dbPath }) =>
  firebase
    .storage()
    .ref(path)
    .delete()
    .then(() => {
      // return path if dbPath or a database does not exist
      if (!dbPath || (!firebase.database && !firebase.firestore)) {
        return { path }
      }

      // Removing file meta info from Firestore
      if (firebase._.config.useFirestoreForStorageMeta) {
        return firebase
          .firestore()
          .doc(dbPath)
          .delete()
          .then(() => ({ path, dbPath }))
      }

      // Removing file meta info from Real Time Database
      return firebase
        .database()
        .ref(dbPath)
        .remove()
        .then(() => ({ path, dbPath }))
    })

/**
 * Write file metadata to Database (either Real Time Datbase or Firestore
 * depending on config).
 * @param {Object} firebase - Internal firebase object
 * @param  {Object} uploadTaskSnapshot - Snapshot from upload task
 * @param  {String} dbPath - Path of meta data with Database (Real Time Or
 * Firestore depnding on config)
 * @return {Promise} Resolves with payload (includes snapshot, File, and
 * metaDataSnapshot)
 */
export function writeMetadataToDb({
  firebase,
  uploadTaskSnapshot,
  dbPath,
  options
}) {
  const {
    metadata: { name, fullPath, downloadURLs, size, contentType }
  } = uploadTaskSnapshot
  const { fileMetadataFactory, useFirestoreForStorageMeta } = firebase._.config
  const { metadataFactory } = options
  const metaFactoryFunction = metadataFactory || fileMetadataFactory
  const originalFileMeta = {
    name,
    fullPath,
    size,
    contentType,
    downloadURL: downloadURLs[0],
    createdAt: useFirestoreForStorageMeta
      ? firebase.firestore.FieldValue.serverTimestamp()
      : firebase.database.ServerValue.TIMESTAMP
  }

  // Apply fileMetadataFactory if it exists in config
  const fileData = isFunction(metaFactoryFunction)
    ? metaFactoryFunction(uploadTaskSnapshot, firebase, originalFileMeta)
    : originalFileMeta

  // Write metadata to Firestore
  if (useFirestoreForStorageMeta) {
    return firebase
      .firestore()
      .collection(dbPath)
      .add(fileData)
      .then(metaDataSnapshot => {
        const payload = {
          snapshot: metaDataSnapshot,
          File: fileData,
          uploadTaskSnapshot,
          id: metaDataSnapshot.id,
          key: metaDataSnapshot.id, // Preserve interface from RTDB
          uploadTaskSnaphot: uploadTaskSnapshot, // Preserving legacy typo
          metaDataSnapshot
        }
        return payload
      })
  }

  // Write metadata to Real Time Database
  return firebase
    .database()
    .ref(dbPath)
    .push(fileData)
    .then(metaDataSnapshot => {
      const payload = {
        snapshot: metaDataSnapshot,
        key: metaDataSnapshot.key,
        File: fileData,
        uploadTaskSnapshot,
        get uploadTaskSnaphot() {
          /* eslint-disable no-console */
          console.warn(
            'Warning "uploadTaskSnaphot" method is deprecated (in favor of the correctly spelled version) and will be removed in the next major version'
          )
          /* eslint-enable no-console */
          return uploadTaskSnapshot
        },
        metaDataSnapshot
      }
      return payload
    })
}

/**
 * @description Upload a file with actions fired for progress, success, and errors
 * @param {Function} dispatch - Action dispatch function
 * @param {Object} firebase - Internal firebase object
 * @param {Object} opts - File data object
 * @param {Object} opts.path - Location within Firebase Stroage at which to upload file.
 * @param {Blob} opts.file - File to upload
 * @private
 */
export const uploadFileWithProgress = (dispatch, firebase, { path, file }) => {
  const uploadEvent = firebase
    .storage()
    .ref(`${path}/${file.name}`)
    .put(file)

  // TODO: Allow config to control whether progress it set to state or not
  const unListen = uploadEvent.on(firebase.storage.TaskEvent.STATE_CHANGED, {
    next: snapshot => {
      dispatch({
        type: FILE_UPLOAD_PROGRESS,
        path,
        payload: {
          snapshot,
          percent: Math.floor(
            snapshot.bytesTransferred / snapshot.totalBytes * 100
          )
        }
      })
    },
    error: err => {
      dispatch({ type: FILE_UPLOAD_ERROR, path, payload: err })
      unListen()
    },
    complete: () => {
      dispatch({ type: FILE_UPLOAD_COMPLETE, path, payload: file })
      unListen()
    }
  })
  return uploadEvent
}
