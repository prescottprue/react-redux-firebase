import { map, isFunction } from 'lodash'
import { actionTypes } from '../constants'
import { wrapInDispatch } from '../utils/actions'
import {
  deleteFile as deleteFileFromFb,
  writeMetadataToDb,
  uploadFileWithProgress
} from '../utils/storage'

const {
  FILE_UPLOAD_START,
  FILE_UPLOAD_ERROR,
  FILE_UPLOAD_COMPLETE,
  FILE_DELETE_START,
  FILE_DELETE_ERROR,
  FILE_DELETE_COMPLETE
} = actionTypes

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
export function uploadFile(dispatch, firebase, config) {
  if (!firebase.storage) {
    throw new Error('Firebase storage is required to upload files')
  }
  const { path, file, dbPath, options = { progress: false } } = config || {}
  const { logErrors } = firebase._.config

  // File renaming through options (supporting string and function)
  const nameFromOptions = isFunction(options.name)
    ? options.name(file, firebase, config)
    : options.name
  const filename = nameFromOptions || file.name

  const meta = { ...config, filename }

  // Dispatch start action
  dispatch({ type: FILE_UPLOAD_START, payload: { ...config, filename } })

  const uploadPromise = () =>
    options.progress
      ? uploadFileWithProgress(dispatch, firebase, {
          path,
          file,
          filename,
          meta
        })
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

      // Write File metadata to either Real Time Database or Firestore (depending on config)
      return writeMetadataToDb({
        firebase,
        uploadTaskSnapshot,
        dbPath,
        options
      }).then(payload => {
        dispatch({
          type: FILE_UPLOAD_COMPLETE,
          meta: { ...config, filename },
          payload
        })
        return payload
      })
    })
    .catch(err => {
      if (logErrors) {
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
export function uploadFiles(dispatch, firebase, { files, ...other }) {
  return Promise.all(
    map(files, file => uploadFile(dispatch, firebase, { file, ...other }))
  )
}

/**
 * @description Delete File from Firebase Storage with option to remove meta
 * @param {Function} dispatch - Action dispatch function
 * @param {Object} firebase - Internal firebase object
 * @param {Object} opts - Options object
 * @param {String} opts.path - Storage path to write files to
 * @param {String} opts.dbPath - Datbase path to write file meta data to
 * @private
 */
export function deleteFile(dispatch, firebase, { path, dbPath }) {
  return wrapInDispatch(dispatch, {
    method: deleteFileFromFb,
    args: [firebase, { path, dbPath }],
    types: [FILE_DELETE_START, FILE_DELETE_COMPLETE, FILE_DELETE_ERROR]
  })
}
