
import {
    SET,
    SET_PROFILE,
    LOGIN,
    LOGOUT,
    LOGIN_ERROR,
    NO_VALUE
} from './constants'

import { Promise } from 'es6-promise'

const getWatchPath = (event, path) => event + ':' + ((path.substring(0, 1) === '/') ? '' : '/') + path

const setWatcher = (firebase, event, path, queryId = undefined) => {
  const id = (queryId) ? event + ':/' + queryId : getWatchPath(event, path)

  if (firebase._.watchers[id]) {
    firebase._.watchers[id]++
  } else {
    firebase._.watchers[id] = 1
  }

  return firebase._.watchers[id]
}

const getWatcherCount = (firebase, event, path, queryId = undefined) => {
  const id = (queryId) ? event + ':/' + queryId : getWatchPath(event, path)
  return firebase._.watchers[id]
}

const getQueryIdFromPath = (path) => {
  const origPath = path
  let pathSplitted = path.split('#')
  path = pathSplitted[0]

  let isQuery = pathSplitted.length > 1
  let queryParams = isQuery ? pathSplitted[1].split('&') : []
  let queryId = isQuery ? queryParams.map((param) => {
    let splittedParam = param.split('=')
    if (splittedParam[0] === 'queryId') {
      return splittedParam[1]
    }
  }).filter(q => q) : undefined

  return (queryId && queryId.length > 0)
    ? queryId[0]
    : ((isQuery) ? origPath : undefined)
}

const unsetWatcher = (firebase, event, path, queryId = undefined) => {
  let id = queryId || getQueryIdFromPath(path)
  path = path.split('#')[0]

  if (!id) {
    id = getWatchPath(event, path)
  }

  if (firebase._.watchers[id] <= 1) {
    delete firebase._.watchers[id]
    if (event !== 'first_child') {
      firebase.database().ref().child(path).off(event)
    }
  } else if (firebase._.watchers[id]) {
    firebase._.watchers[id]--
  }
}

export const watchEvent = (firebase, dispatch, event, path, dest, onlyLastEvent = false) => {
  let isQuery = false
  let queryParams = []
  let queryId = getQueryIdFromPath(path)

  if (queryId) {
    let pathSplitted = path.split('#')
    path = pathSplitted[0]
    isQuery = true
    queryParams = pathSplitted[1].split('&')
  }

  const watchPath = (!dest) ? path : path + '@' + dest
  const counter = getWatcherCount(firebase, event, watchPath, queryId)

  if (counter > 0) {
    if (onlyLastEvent) {
      // listen only to last query on same path
      if (queryId) {
        unsetWatcher(firebase, event, path, queryId)
      } else {
        return
      }
    }
  }

  setWatcher(firebase, event, watchPath, queryId)

  if (event === 'first_child') {
    // return
    return firebase.database().ref().child(path).orderByKey().limitToFirst(1).once('value', snapshot => {
      if (snapshot.val() === null) {
        dispatch({
          type: NO_VALUE,
          path
        })
      }
    })
  }

  let query = firebase.database().ref().child(path)

  if (isQuery) {
    let doNotParse = false

    queryParams.forEach((param) => {
      param = param.split('=')
      switch (param[0]) {
        case 'orderByValue':
          query = query.orderByValue()
          doNotParse = true
          break
        case 'orderByPriority':
          query = query.orderByPriority()
          doNotParse = true
          break
        case 'orderByKey':
          query = query.orderByKey()
          doNotParse = true
          break
        case 'orderByChild':
          query = query.orderByChild(param[1])
          break
        case 'limitToFirst':
          query = query.limitToFirst(parseInt(param[1]))
          break
        case 'limitToLast':
          query = query.limitToLast(parseInt(param[1]))
          break
        case 'equalTo':
          let equalToParam = !doNotParse ? parseInt(param[1]) || param[1] : param[1]
          equalToParam = equalToParam === 'null' ? null : equalToParam
          query = param.length === 3
            ? query.equalTo(equalToParam, param[2])
            : query.equalTo(equalToParam)
          break
        case 'startAt':
          let startAtParam = !doNotParse ? parseInt(param[1]) || param[1] : param[1]
          startAtParam = startAtParam === 'null' ? null : startAtParam
          query = param.length === 3
            ? query.startAt(startAtParam, param[2])
            : query.startAt(startAtParam)
          break
        case 'endAt':
          let endAtParam = !doNotParse ? parseInt(param[1]) || param[1] : param[1]
          endAtParam = endAtParam === 'null' ? null : endAtParam
          query = param.length === 3
            ? query.endAt(endAtParam, param[2])
            : query.endAt(endAtParam)
          break
        default:
          break
      } })
  }

  const runQuery = (q, e, p) => {
    q.on(e, snapshot => {
      let data = (e === 'child_removed') ? undefined : snapshot.val()
      const resultPath = dest || (e === 'value') ? p : p + '/' + snapshot.key()
      if (dest && e !== 'child_removed') {
        data = {
          _id: snapshot.key(),
          val: snapshot.val()
        }
      }
      dispatch({
        type: SET,
        path: resultPath,
        data,
        snapshot
      })
    })
  }

  runQuery(query, event, path)
}

export const unWatchEvent = (firebase, event, path, queryId = undefined) =>
    unsetWatcher(firebase, event, path, queryId)

export const watchEvents = (firebase, dispatch, events) =>
    events.forEach(event => watchEvent(firebase, dispatch, event.name, event.path))

export const unWatchEvents = (firebase, events) =>
    events.forEach(event => unWatchEvent(firebase, event.name, event.path))

const dispatchLoginError = (dispatch, authError) =>
    dispatch({
      type: LOGIN_ERROR,
      authError
    })

const dispatchLogin = (dispatch, auth) =>
    dispatch({
      type: LOGIN,
      auth,
      authError: null
    })

const unWatchUserProfile = (firebase) => {
  const authUid = firebase._.authUid
  const userProfile = firebase._.config.userProfile
  if (firebase._.profileWatch) {
    firebase.database().ref().child(`${userProfile}/${authUid}`).off('value', firebase._.profileWatch)
    firebase._.profileWatch = null
  }
}

const watchUserProfile = (dispatch, firebase) => {
  const authUid = firebase._.authUid
  const userProfile = firebase._.config.userProfile
  unWatchUserProfile(firebase)
  if (firebase._.config.userProfile) {
    firebase._.profileWatch = firebase.database().ref().child(`${userProfile}/${authUid}`).on('value', snap => {
      dispatch({
        type: SET_PROFILE,
        profile: snap.val()
      })
    })
  }
}

export const login = (dispatch, firebase, {email, password}) => {
  dispatchLoginError(dispatch, null)
  return firebase.auth()
    .signInWithEmailAndPassword(email, password)
    .catch(err => {
      dispatchLoginError(dispatch, err)
      return Promise.reject(err)
    })
}

export const init = (dispatch, firebase) => {
  firebase.auth().onAuthStateChanged(authData => {
    if (!authData) {
      return dispatch({type: LOGOUT})
    }

    firebase._.authUid = authData.uid
    watchUserProfile(dispatch, firebase)

    dispatchLogin(dispatch, authData)
  })

  firebase.auth().currentUser
}

export const logout = (dispatch, firebase) => {
  firebase.auth().signOut()
  dispatch({type: LOGOUT})
  firebase._.authUid = null
  unWatchUserProfile(firebase)
}

export const createUser = (dispatch, firebase, { email, password }, profile) =>
  new Promise((resolve, reject) => {
    dispatchLoginError(dispatch, null)
    if (!email || !password) {
      dispatchLoginError(dispatch, new Error('Email and Password are required to create user'))
      return reject('Email and Password are Required')
    }
    firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userData) => {
        // Save profile to userProfile path if available
        if (profile && firebase._.config.userProfile) {
          firebase.database()
            .ref()
            .child(`${firebase._.config.userProfile}/${userData.uid}`)
            .set(profile)
            .catch(err => {
              dispatchLoginError(dispatch, err)
              reject(err)
            })
        }
        login(dispatch, firebase, { email, password })
          .then(() => resolve(userData.uid))
          .catch(err => {
            if (err) {
              switch (err.code) {
                case 'auth/user-not-found':
                  dispatchLoginError(dispatch, new Error('The specified user account does not exist.'))
                  break
                default:
                  dispatchLoginError(dispatch, err)
              }
            }
            reject(err || new Error('The specified user account does not exist.'))
          })
      })
      .catch((err) => {
        dispatchLoginError(dispatch, err)
        reject(err)
      })
  })

export const resetPassword = (dispatch, firebase, email) => {
  dispatchLoginError(dispatch, null)
  return firebase.auth()
    .sendPasswordResetEmail(email)
    .catch((err) => {
      if (err) {
        switch (err.code) {
          case 'INVALID_USER':
            dispatchLoginError(dispatch, new Error('The specified user account does not exist.'))
            break
          default:
            dispatchLoginError(dispatch, err)
        }
        return
      }
    })
}

export default { watchEvents, unWatchEvents, init, logout, createUser, resetPassword }
