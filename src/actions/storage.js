import { map } from 'lodash'

import { actionTypes } from '../constants'

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
 * @param {Object} fileData - File data object
 */
export const uploadFileWithProgress = (dispatch, firebase, { path, file }) => {
  dispatch({
    type: FILE_UPLOAD_START,
    payload: { path, file }
  })
  const uploadEvent = firebase.storage().ref(`${path}/${file.name}`).put(file)
  // TODO: Allow config to control whether progress it set to state or not
  const unListen = uploadEvent.on(
    firebase.storage.TaskEvent.STATE_CHANGED,
    {
      next: (snapshot) => {
        const percent = Math.floor(snapshot.bytesTransferred / snapshot.totalBytes * 100)
        dispatch({
          type: FILE_UPLOAD_PROGRESS,
          path,
          payload: { snapshot, percent }
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

export const uploadFile = (dispatch, firebase, { path, file, dbPath }) =>
  uploadFileWithProgress(dispatch, firebase, { path, file })
    .then((res) => {
      if (!dbPath) {
        return res
      }
      const { metadata: { name, fullPath, downloadURLs } } = res
      return firebase.database()
        .ref(dbPath)
        .push({ name, fullPath, downloadURLs })
    })

export const uploadFiles = (dispatch, firebase, { path, files, dbPath }) =>
  Promise.all(
    map(files, (file) =>
      uploadFile(dispatch, firebase, { path, file, dbPath })
    )
  )

export const deleteFile = (dispatch, firebase, { path, dbPath }) => {
  dispatch({
    type: FILE_DELETE_START,
    path
  })
  return firebase.storage()
    .ref(path)
    .delete()
    .then(() => {
      if (!dbPath) {
        dispatch({
          path,
          type: FILE_DELETE_COMPLETE
        })
        return { path, dbPath }
      }

      // Handle option for removing file info from database
      return firebase.database()
        .ref(dbPath)
        .remove()
        .then(() => {
          dispatch({
            type: FILE_DELETE_COMPLETE
          })
          return { path, dbPath }
        })
    })
    .catch((err) => {
      dispatch({
        type: FILE_DELETE_ERROR,
        payload: err
      })
      return Promise.reject(err)
    })
}
