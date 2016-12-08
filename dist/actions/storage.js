'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteFile = exports.uploadFiles = exports.uploadFile = exports.uploadFileWithProgress = undefined;

var _map2 = require('lodash/map');

var _map3 = _interopRequireDefault(_map2);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FILE_UPLOAD_START = _constants.actionTypes.FILE_UPLOAD_START,
    FILE_UPLOAD_ERROR = _constants.actionTypes.FILE_UPLOAD_ERROR,
    FILE_UPLOAD_PROGRESS = _constants.actionTypes.FILE_UPLOAD_PROGRESS,
    FILE_UPLOAD_COMPLETE = _constants.actionTypes.FILE_UPLOAD_COMPLETE,
    FILE_DELETE_START = _constants.actionTypes.FILE_DELETE_START,
    FILE_DELETE_ERROR = _constants.actionTypes.FILE_DELETE_ERROR,
    FILE_DELETE_COMPLETE = _constants.actionTypes.FILE_DELETE_COMPLETE;

/**
 * @description Upload a file with actions fired for progress, success, and errors
 * @param {Function} dispatch - Action dispatch function
 * @param {Object} firebase - Internal firebase object
 * @param {Object} fileData - File data object
 */

var uploadFileWithProgress = exports.uploadFileWithProgress = function uploadFileWithProgress(dispatch, firebase, _ref) {
  var path = _ref.path,
      file = _ref.file;

  dispatch({
    type: FILE_UPLOAD_START,
    payload: { path: path, file: file }
  });
  var uploadEvent = firebase.storage().ref(path + '/' + file.name).put(file);
  // TODO: Allow config to control whether progress it set to state or not
  var unListen = uploadEvent.on(firebase.storage.TaskEvent.STATE_CHANGED, {
    next: function next(snapshot) {
      var percent = Math.floor(snapshot.bytesTransferred / snapshot.totalBytes * 100);
      dispatch({
        type: FILE_UPLOAD_PROGRESS,
        path: path,
        payload: { snapshot: snapshot, percent: percent }
      });
    },
    error: function error(err) {
      dispatch({ type: FILE_UPLOAD_ERROR, path: path, payload: err });
      unListen();
    },
    complete: function complete() {
      dispatch({ type: FILE_UPLOAD_COMPLETE, path: path, payload: file });
      unListen();
    }
  });
  return uploadEvent;
};

var uploadFile = exports.uploadFile = function uploadFile(dispatch, firebase, _ref2) {
  var path = _ref2.path,
      file = _ref2.file,
      dbPath = _ref2.dbPath;
  return uploadFileWithProgress(dispatch, firebase, { path: path, file: file }).then(function (res) {
    if (!dbPath) {
      return res;
    }
    var _res$metadata = res.metadata,
        name = _res$metadata.name,
        fullPath = _res$metadata.fullPath,
        downloadURLs = _res$metadata.downloadURLs;

    return firebase.database().ref(dbPath).push({ name: name, fullPath: fullPath, downloadURLs: downloadURLs });
  });
};

var uploadFiles = exports.uploadFiles = function uploadFiles(dispatch, firebase, _ref3) {
  var path = _ref3.path,
      files = _ref3.files,
      dbPath = _ref3.dbPath;
  return Promise.all((0, _map3.default)(files, function (file) {
    return uploadFile(dispatch, firebase, { path: path, file: file, dbPath: dbPath });
  }));
};

var deleteFile = exports.deleteFile = function deleteFile(dispatch, firebase, _ref4) {
  var path = _ref4.path,
      dbPath = _ref4.dbPath;

  dispatch({
    type: FILE_DELETE_START,
    path: path
  });
  return firebase.storage().ref(path).delete().then(function () {
    if (!dbPath) {
      dispatch({
        path: path,
        type: FILE_DELETE_COMPLETE
      });
      return { path: path, dbPath: dbPath };
    }

    // Handle option for removing file info from database
    return firebase.database().ref(dbPath).remove().then(function () {
      dispatch({
        type: FILE_DELETE_COMPLETE
      });
      return { path: path, dbPath: dbPath };
    });
  }).catch(function (err) {
    dispatch({
      type: FILE_DELETE_ERROR,
      payload: err
    });
    return Promise.reject(err);
  });
};