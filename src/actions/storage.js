import { map, isFunction } from 'lodash'
import { actionTypes } from '../constants'
import { wrapInDispatch } from '../utils/actions'
import { deleteFile as deleteFileFromFb } from '../utils/storage'

const {
  FILE_UPLOAD_START,
  FILE_UPLOAD_ERROR,
  FILE_UPLOAD_PROGRESS,
  FILE_UPLOAD_COMPLETE,
  FILE_DELETE_START,
  FILE_DELETE_ERROR,
  FILE_DELETE_COMPLETE
} = actionTypes

/**
 * @description Upload a file with actions fired for progress, success, and errors
 * @param {Function} dispatch - Action dispatch function
 * @param {Object} firebase - Internal firebase object
 * @param {Object} opts - File data object
 * @param {Object} opts.path - Location within Firebase Stroage at which to upload file.
 * @param {Blob} opts.file - File to upload
 * @private
 */
const uploadFileWithProgress = (dispatch, firebase, { path, file }) => {
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

/**
 * @description Upload file to Firebase Storage with option to store
 * file metadata within Firebase Database
 * @param {Function} dispatch - Action dispatch function
 * @param {Object} firebase - Internal firebase object
 * @param {Object} config - Config object
 * @param {String} config.path - Location within Firebase Stroage at which to upload files.
 * @param {Blob} config.file - File Blob to be uploaded
 * @param {String} config.dbPath - Datbase path to write file meta data to
 * @param {Object} config.options - Options
 * @param {String|Function} config.options.name - Name of file. If a function
 * is provided it recieves (fileObject, internalFirebase, config) as arguments.
 * @return {Promise} Resolves with meta object
 * @private
 */
export const uploadFile = (dispatch, firebase, config) => {
  if (!firebase.storage) {
    throw new Error('Firebase storage is required to upload files')
  }
  const { path, file, dbPath, options = { progress: false } } = config
  const nameFromOptions = isFunction(options.name)
    ? options.name(file, firebase, config)
    : options.name
  const filename = nameFromOptions || file.name
  const { enableLogging, logErrors } = firebase._.config

  dispatch({ type: FILE_UPLOAD_START, payload: { ...config, filename } })

  const uploadPromise = () =>
    options.progress
      ? uploadFileWithProgress(dispatch, firebase, { path, file })
      : firebase
          .storage()
          .ref(`${path}/${filename}`)
          .put(file)

  return uploadPromise()
    .then(uploadTaskSnapshot => {
      if (!dbPath || !firebase.database) {
        dispatch({
          type: FILE_UPLOAD_COMPLETE,
          meta: { ...config, filename },
          payload: {
            uploadTaskSnapshot,
            uploadTaskSnaphot: uploadTaskSnapshot // Preserving legacy typo
          }
        })
        return {
          uploadTaskSnapshot,
          uploadTaskSnaphot: uploadTaskSnapshot // Preserving legacy typo
        }
      }
      const {
        metadata: { name, fullPath, downloadURLs, size, contentType }
      } = uploadTaskSnapshot
      const { fileMetadataFactory } = firebase._.config

      // Apply fileMetadataFactory if it exists in config
      const fileData = isFunction(fileMetadataFactory)
        ? fileMetadataFactory(uploadTaskSnapshot, firebase)
        : {
            name,
            fullPath,
            size,
            contentType,
            downloadURL: downloadURLs[0],
            createdAt: firebase.database.ServerValue.TIMESTAMP
          }

      // TODO: Support uploading metadata to Firestore
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
            uploadTaskSnaphot: uploadTaskSnapshot, // Preserving legacy typo
            metaDataSnapshot
          }
          dispatch({
            type: FILE_UPLOAD_COMPLETE,
            meta: { ...config, filename },
            payload
          })
          return payload
        })
    })
    .catch(err => {
      if (enableLogging || logErrors) {
        /* eslint-disable no-console */
        console.error &&
          console.error(`RRF: Error uploading file: ${err.message || err}`, err)
        /* eslint-enable no-console */
      }
      dispatch({ type: FILE_UPLOAD_ERROR, path, payload: err })
      return Promise.reject(err)
    })
}

/**
 * @description Upload multiple files to Firebase Storage with option to store
 * file's metadata within Firebase Database
 * @param {Function} dispatch - Action dispatch function
 * @param {Object} firebase - Internal firebase object
 * @param {Object} opts - Options object
 * @param {String} opts.path - Storage path to write files to
 * @param {Array} opts.files - List of files to be uploaded
 * @param {String} opts.dbPath - Datbase path to write file meta data to
 * @private
 */
export const uploadFiles = (dispatch, firebase, { files, ...other }) =>
  Promise.all(
    map(files, file => uploadFile(dispatch, firebase, { file, ...other }))
  )

/**
 * @description Delete File from Firebase Storage with option to remove meta
 * @param {Function} dispatch - Action dispatch function
 * @param {Object} firebase - Internal firebase object
 * @param {Object} opts - Options object
 * @param {String} opts.path - Storage path to write files to
 * @param {String} opts.dbPath - Datbase path to write file meta data to
 * @private
 */
export const deleteFile = (dispatch, firebase, { path, dbPath }) =>
  wrapInDispatch(dispatch, {
    method: deleteFileFromFb,
    args: [firebase, { path, dbPath }],
    types: [FILE_DELETE_START, FILE_DELETE_COMPLETE, FILE_DELETE_ERROR]
  })
