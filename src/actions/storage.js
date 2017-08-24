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
export const uploadFileWithProgress = (dispatch, firebase, { path, file }) => {
  dispatch({ type: FILE_UPLOAD_START, payload: { path, file } })
  const uploadEvent = firebase.storage().ref(`${path}/${file.name}`).put(file)
  // TODO: Allow config to control whether progress it set to state or not
  const unListen = uploadEvent.on(
    firebase.storage.TaskEvent.STATE_CHANGED,
    {
      next: (snapshot) => {
        dispatch({
          type: FILE_UPLOAD_PROGRESS,
          path,
          payload: {
            snapshot,
            percent: Math.floor(snapshot.bytesTransferred / snapshot.totalBytes * 100)
          }
        })
      },
      error: (err) => {
        dispatch({ type: FILE_UPLOAD_ERROR, path, payload: err })
        unListen()
      },
      complete: () => {
        dispatch({ type: FILE_UPLOAD_COMPLETE, path, payload: file })
        unListen()
      }
    }
  )
  return uploadEvent
}

/**
 * @description Upload file to Firebase Storage with option to store
 * file metadata within Firebase Database
 * @param {Function} dispatch - Action dispatch function
 * @param {Object} firebase - Internal firebase object
 * @param {Object} opts - Options object
 * @param {String} opts.path - Location within Firebase Stroage at which to upload files.
 * @param {Blob} opts.file - File Blob to be uploaded
 * @param {String} opts.dbPath - Datbase path to write file meta data to
 * @return {Promise} Resolves with uploadFileWithProgress response. If dbPath
 * is included, object with snapshot, key and File is returned.
 * @private
 */
export const uploadFile = (dispatch, firebase, { path, file, dbPath }) =>
  uploadFileWithProgress(dispatch, firebase, { path, file })
    .then((res) => {
      if (!dbPath || !firebase.database) {
        return res
      }
      const { metadata: { name, fullPath, downloadURLs } } = res
      const { fileMetadataFactory } = firebase._.config

      // Apply fileMetadataFactory if it exists in config
      const fileData = isFunction(fileMetadataFactory)
        ? fileMetadataFactory(res)
        : { name, fullPath, downloadURL: downloadURLs[0] }

      return firebase.database()
        .ref(dbPath)
        .push(fileData)
        .then(snapshot => ({ snapshot, key: snapshot.key, File: fileData }))
    })

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
export const uploadFiles = (dispatch, firebase, { path, files, dbPath }) =>
  Promise.all(
    map(files, (file) =>
      uploadFile(dispatch, firebase, { path, file, dbPath })
    )
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
    args: [
      firebase,
      { path, dbPath }
    ],
    types: [
      FILE_DELETE_START,
      FILE_DELETE_COMPLETE,
      FILE_DELETE_ERROR
    ]
  })
