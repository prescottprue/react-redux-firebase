import { isFunction } from 'lodash'
import { actionTypes } from '../constants'

const { FILE_UPLOAD_ERROR, FILE_UPLOAD_PROGRESS } = actionTypes

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
export function deleteFile(firebase, { path, dbPath }) {
  return firebase
    .storage()
    .ref(path)
    .delete()
    .then(() => {
      // return path if dbPath or a database does not exist
      if (!dbPath || (!firebase.database && !firebase.firestore)) {
        return { path }
      }

      // Choose delete function based on config (Handling Firestore and RTDB)
      const metaDeletePromise = () =>
        firebase._.config.useFirestoreForStorageMeta
          ? firebase
              .firestore()
              .doc(dbPath)
              .delete() // file meta in Firestore
          : firebase
              .database()
              .ref(dbPath)
              .remove() // file meta in RTDB

      return metaDeletePromise().then(() => ({ path, dbPath }))
    })
}

/**
 * Create a function to handle response from upload.
 * @param  {Object} fileData - File data which was uploaded
 * @param  {Object} uploadTaskSnapshot - Snapshot from storage upload task
 * @return {Function} Function for handling upload result
 */
function createUploadMetaResponseHandler({
  fileData,
  firebase,
  uploadTaskSnapshot,
  downloadURL
}) {
  /**
   * Converts upload meta data snapshot into an object (handling both
   * RTDB and Firestore)
   * @param  {Object} metaDataSnapshot - Snapshot from metadata upload (from
   * RTDB or Firestore)
   * @return {Object} Upload result including snapshot, key, File
   */
  return function uploadResultFromSnap(metaDataSnapshot) {
    const { useFirestoreForStorageMeta } = firebase._.config
    const result = {
      snapshot: metaDataSnapshot,
      key: metaDataSnapshot.key || metaDataSnapshot.id,
      File: fileData,
      metaDataSnapshot,
      uploadTaskSnapshot,
      // Support legacy method
      uploadTaskSnaphot: uploadTaskSnapshot,
      createdAt: useFirestoreForStorageMeta
        ? firebase.firestore.FieldValue.serverTimestamp()
        : firebase.database.ServerValue.TIMESTAMP
    }
    // Attach id if it exists (Firestore)
    if (metaDataSnapshot.id) {
      result.id = metaDataSnapshot.id
    }
    // Attach downloadURL if it exists
    if (downloadURL) {
      result.downloadURL = downloadURL
    }
    return result
  }
}

function getDownloadURLFromUploadTaskSnapshot(uploadTaskSnapshot) {
  // Handle different downloadURL patterns (Firebase JS SDK v5.*.* vs v4.*.*)
  if (
    uploadTaskSnapshot.ref &&
    typeof uploadTaskSnapshot.ref.getDownloadURL === 'function'
  ) {
    // Get downloadURL and attach to response
    return uploadTaskSnapshot.ref.getDownloadURL()
  }
  // Only attach downloadURL if downloadURLs is defined (not defined in v5.*.*)
  return Promise.resolve(
    uploadTaskSnapshot.downloadURLs && uploadTaskSnapshot.downloadURLs[0]
  )
}

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
  // Support metadata factories from both global config and options
  const { fileMetadataFactory, useFirestoreForStorageMeta } = firebase._.config
  const { metadataFactory } = options
  const metaFactoryFunction = metadataFactory || fileMetadataFactory
  // Get download URL for use in metadata write
  return getDownloadURLFromUploadTaskSnapshot(uploadTaskSnapshot).then(
    downloadURL => {
      // Apply fileMetadataFactory if it exists in config
      const fileData = isFunction(metaFactoryFunction)
        ? metaFactoryFunction(
            uploadTaskSnapshot,
            firebase,
            uploadTaskSnapshot.metadata,
            downloadURL
          )
        : uploadTaskSnapshot.metadata

      // Create the snapshot handler function
      const resultFromSnap = createUploadMetaResponseHandler({
        fileData,
        firebase,
        uploadTaskSnapshot,
        downloadURL
      })

      const metaSetPromise = fileData =>
        useFirestoreForStorageMeta
          ? firebase // Write metadata to Firestore
              .firestore()
              .collection(dbPath)
              .add(fileData)
          : firebase // Write metadata to Real Time Database
              .database()
              .ref(dbPath)
              .push(fileData)
              .then(() => firebase.database().ref(dbPath))

      return metaSetPromise(fileData).then(resultFromSnap)
    }
  )
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
export function uploadFileWithProgress(
  dispatch,
  firebase,
  { path, file, filename, meta }
) {
  const uploadEvent = firebase
    .storage()
    .ref(`${path}/${filename}`)
    .put(file)

  const unListen = uploadEvent.on(firebase.storage.TaskEvent.STATE_CHANGED, {
    next: snapshot => {
      dispatch({
        type: FILE_UPLOAD_PROGRESS,
        meta,
        payload: {
          snapshot,
          percent: Math.floor(
            snapshot.bytesTransferred / snapshot.totalBytes * 100
          )
        }
      })
    },
    error: err => {
      dispatch({ type: FILE_UPLOAD_ERROR, meta, payload: err })
      unListen()
    },
    complete: () => {
      unListen()
    }
  })
  return uploadEvent
}
