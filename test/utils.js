import React, { Children, Component, cloneElement } from 'react'
import PropTypes from 'prop-types'
import { createSink } from 'recompose'
import { isObject, identity } from 'lodash'
import { createStore, combineReducers } from 'redux'
import {
  reducer as firestoreReducer,
  createFirestoreInstance
} from 'redux-firestore'
import { mount } from 'enzyme'
import ReactReduxFirebaseProvider from '../src/ReactReduxFirebaseProvider'

export const storeWithFirebase = () => {
  return createStore(combineReducers({ test: (state = {}) => state }))
}

export const storeWithFirestore = () => {
  return createStore(
    combineReducers({
      test: (state = {}) => state,
      firestore: firestoreReducer
    })
  )
}

export const TestContainer = () => createSink()
export class Container extends Component {
  render() {
    return <div />
  }
}

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>
    }

    return this.props.children
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired
}

export class ProviderMock extends Component {
  getChildContext() {
    return { store: this.props.store }
  }

  state = { test: null, dynamic: '' }

  render() {
    return Children.only(
      cloneElement(this.props.children, {
        testProp: this.state.test,
        dynamicProp: this.state.dynamic
      })
    )
  }
}

ProviderMock.childContextTypes = {
  store: PropTypes.object.isRequired
}

ProviderMock.propTypes = {
  store: PropTypes.object,
  children: PropTypes.node
}

export const onAuthStateChangedSpy = sinon.spy(f => {
  f({ uid: 'asdfasdf' })
})

export const firebaseWithConfig = (config = {}) => ({
  ...Firebase,
  _: {
    ...Firebase._,
    config: { ...Firebase._.config, ...config }
  }
})

/**
 * Create a Sinon stub that returns with a resolved Promise Object
 * @param {Any} some
 * @returns {Sinon.stub}
 */
export function createSuccessStub(some) {
  return sinon.stub().returns(Promise.resolve(some))
}

/**
 * Create a Sinon stub that returns with a rejected Promise Object
constaining an Error object with the message "test"
 *
 * @returns {Sinon.stub}
 * @param some
 */
export function createFailureStub(some) {
  return sinon.stub().returns(Promise.reject(new Error('test')))
}

/**
 * Create an object representing a "profileReference" (a Firebase
 * RTDB Reference at the Profile path) which contains Sinon stubs
 * in place of Firebase JS SDK methods (such as update and once)
 * @returns {object}
 */
function createRtdbProfileRefStub() {
  let profileUpdate = {}
  return {
    update: sinon.spy(setData => {
      // Fail automatically for intentionally rejected promise
      // (used in testing that rejecting set promise is handled)
      if (setData === 'fail') {
        return Promise.reject(new Error('test'))
      }
      profileUpdate = setData
      return Promise.resolve()
    }),
    once: createSuccessStub({
      val: () => ({ ...existingProfile, ...profileUpdate })
    })
  }
}

/**
 * Create an object representing a "profileReference" (a Firebase
 * Firestore Reference for the current user's profile document) which
 * contains Sinon stubs in place of Firebase JS SDK methods (such as
 * update and get)
 * @returns {object}
 */
function createFirestoreProfileRefStub() {
  let profileUpdate = {}
  return {
    update: createSuccessStub(),
    set: sinon.spy(setData => {
      // Fail automatically for intentionally rejected promise
      // (used in testing that rejecting set promise is handled)
      if (setData === 'fail') {
        return Promise.reject(new Error('test'))
      }
      // Emulate Firebase's error for trying to call update without an object
      if (!isObject(setData)) {
        return Promise.reject(
          new Error(
            'Reference.update failed: First argument  must be an object containing the children to replace.'
          )
        )
      }
      profileUpdate = setData
      return Promise.resolve()
    }),
    get: createSuccessStub({
      data: () => ({ ...existingProfile, ...profileUpdate })
    })
  }
}

/**
 * Create a Sinon stub for Firestore
 * @returns {Sinon.stub}
 */
function createFirestoreStub() {
  return sinon.stub().returns({
    doc: sinon
      .stub()
      // Current User's Profile
      .withArgs(`users/${uid}`)
      .returns(createFirestoreProfileRefStub())
  })
}

/**
 * Create a Sinon stub for Firebase Real Time Database (RTDB)
 *
 * @returns {Sinon.stub}
 * @param refExtension
 */
function createRtdbStub(refExtension) {
  let refReturn = {
    push: sinon.stub().returns({ set: createSuccessStub() }),
    ...createRtdbProfileRefStub()
  }
  if (refExtension) {
    refReturn = { ...refReturn, ...refExtension }
  }
  const stubbedRtdb = sinon.stub().returns({
    ref: sinon.stub().returns(refReturn)
  })
  stubbedRtdb.ServerValue = { TIMESTAMP: 'test' }
  return stubbedRtdb
}

/**
 * Create a Sinon stub for Firebase's Auth
 * @returns {Sinon.stub}
 */
function createAuthStub() {
  return sinon.stub().returns({
    signOut: sinon.stub().returns(Promise.resolve())
  })
}

/**
 * Create a Sinon stub for Firebase Storage
 * @returns {Sinon.stub}
 */
function createStorageStub() {
  return sinon.stub().returns({
    ref: sinon.stub().returns({
      put: createSuccessStub({
        getDownloadUrl: createSuccessStub()
      })
    })
  })
}

/**
 * @param extensions
 * @param {object} otherConfig - Config to be spread onto _.config object
 * @param rtdbRefExtension
 * @returns {object} Stubbed version of Firebase JS SDK extended with
 * react-redux-firebase config
 */
export function createFirebaseStub(otherConfig = {}, extensions) {
  return {
    _: {
      uid,
      config: {
        userProfile: 'users',
        ...otherConfig
      }
    },
    auth: createAuthStub(),
    database: createRtdbStub(extensions && extensions.database),
    firestore: createFirestoreStub(),
    storage: createStorageStub()
  }
}

export const fakeFirebase = {
  _: {
    authUid: '123',
    config: {
      userProfile: 'users',
      disableRedirectHandling: true
    }
  },
  database: () => ({
    ref: () => ({
      val: () => ({ some: 'obj' }),
      remove: () => Promise.resolve({}),
      child: () => ({
        on: () => ({ val: () => ({ some: 'obj' }) }),
        off: () => Promise.resolve({ val: () => ({ some: 'obj' }) }),
        once: () => Promise.resolve({ val: () => ({ some: 'obj' }) })
      }),
      orderByValue: () => ({
        on: () => ({ val: () => ({ some: 'obj' }) }),
        off: () => Promise.resolve({ val: () => ({ some: 'obj' }) }),
        once: () => Promise.resolve({ val: () => ({ some: 'obj' }) })
      }),
      orderByPriority: () => ({
        startAt: startParam => startParam,
        toString: () => 'priority'
      }),
      orderByChild: child => ({
        equalTo: equalTo => ({
          child,
          equalTo
        }),
        toString: () => child
      }),
      orderByKey: () => ({}),
      limitToFirst: () => ({}),
      limitToLast: () => ({}),
      equalTo: () => ({}),
      startAt: () => ({}),
      endAt: () => ({})
      // update: sinon.stub().returns(Promise.resolve()), // used with profile update
      // once: sinon.stub().returns(Promise.resolve()) // used with profile update
      // .withArgs('fail')
      // .returns(Promise.reject(new Error('test')))
    }),
    update: () =>
      Promise.resolve({
        val: () => ({ some: 'obj' })
      })
  }),
  auth: () => ({
    onAuthStateChanged: onAuthStateChangedSpy,
    getRedirectResult: f => {
      return Promise.resolve({ uid: 'asdfasdf' })
    },
    signOut: () => Promise.resolve({}),
    createUserWithEmailAndPassword: (email, password) =>
      email.indexOf('error') !== -1
        ? Promise.reject(new Error('auth/user-not-found'))
        : email === 'error'
          ? Promise.reject(new Error('asdfasdf'))
          : Promise.resolve({
              uid: '123',
              email: 'test@test.com',
              providerData: [{}]
            }),
    signInAndRetrieveDataWithCustomToken: () => {
      return Promise.resolve({
        toJSON: () => ({
          stsTokenManager: {
            accessToken:
              'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJjbGFpbXMiOnsiZGlzcGxheU5hbWUiOiJFZHdhcmQgV3UiLCJlbWFpbCI6ImVkZGlld3U4MEBnbWFpbC5jb20iLCJvcmlnaW5hbElkIjoiSlFYQ2dRTkxEU1lSMFEzdjlwY3FjTDZJeGRUMiIsInByb3ZpZGVyRGF0YSI6W3siZGlzcGxheU5hbWUiOiJFZHdhcmQgV3UiLCJlbWFpbCI6ImVkZGlld3U4MEBnbWFpbC5jb20ifV19LCJ1aWQiOiJqaTh3c1BDVW5PYUhvUGZBalNCS2ZReU1pTmkxIiwiaWF0IjoxNDc1NDM3MDMyLCJleHAiOjE0NzU0NDA2MzIsImF1ZCI6Imh0dHBzOi8vaWRlbnRpdHl0b29sa2l0Lmdvb2dsZWFwaXMuY29tL2dvb2dsZS5pZGVudGl0eS5pZGVudGl0eXRvb2xraXQudjEuSWRlbnRpdHlUb29sa2l0IiwiaXNzIjoicmVzaWRlLXByb2RAcmVzaWRlLXByb2QuaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20iLCJzdWIiOiJyZXNpZGUtcHJvZEByZXNpZGUtcHJvZC5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSJ9.aOXOCCAL-lI5AVnd8MVlc86exvCGNySq8X7DM4Gr7PG0ek5mh_8qnFfLuzw2gfv6mHNVgY2UngUmG0qETaBdox7l3wBo1GdP9hB1bM8NltCYffXwxyw7sN36BFWD3l-cz4rlxfmfzosCLj3XtDK8ARDQ76pAXxsK-rRBvMG6N-wgE_ZLf17FVvwB95e1DAmL39fp6dRVxoPflG--m4QEKVk8xIeDx4ol9HJw512gMGtTkRDMEPWVJEdaEAp6L6Lo2-Bk-TxBCHs8gpb7b7eidWMUEXObk0UPQIz2DRh-3olbruimzL_SgPNg4Pz0uUYSn11-Mx_HxxiVtyQj1ufoLA'
          },
          uid: 'asdfasdfsdf'
        })
      })
    },
    signInWithEmailAndPassword: (email, password) =>
      email.indexOf('error2') !== -1
        ? Promise.reject(new Error('asdfasdf'))
        : email === 'error3'
          ? Promise.reject(new Error('auth/user-not-found'))
          : Promise.resolve({
              uid: '123',
              email: 'test@test.com',
              providerData: [{}]
            }),
    sendPasswordResetEmail: email =>
      email === 'error'
        ? Promise.reject({ code: 'auth/user-not-found' }) // eslint-disable-line prefer-promise-reject-errors
        : email === 'error2'
          ? Promise.reject(new Error('asdfasdf'))
          : Promise.resolve({ some: 'val' }),
    confirmPasswordReset: (code, password) =>
      password === 'error'
        ? Promise.reject({ code: code }) // eslint-disable-line prefer-promise-reject-errors
        : Promise.resolve(),
    verifyPasswordResetCode: code =>
      code === 'error'
        ? Promise.reject(new Error('some'))
          ? Promise.reject({ code: 'asdfasdf' }) // eslint-disable-line prefer-promise-reject-errors
          : Promise.resolve({
              uid: '123',
              email: 'test@test.com',
              providerData: [{}]
            })
        : Promise.resolve('success')
  }),
  storage: () => ({
    ref: () => ({
      put: () => ({
        on: (event, funcsObj) => {
          funcsObj.next({ bytesTransferred: 12, totalBytes: 12 })
          funcsObj.error()
          funcsObj.complete()
          return sinon.spy()
        },
        then: () => Promise.resolve({})
      }),
      delete: () => Promise.resolve({ val: () => ({ some: 'obj' }) })
    })
  })
}

export const TestLeaf = () => <div id="leaf" />

export const createContainer = ({
  additionalComponentProps,
  listeners,
  withFirestore = true,
  withFirebase = true,
  withErrorBoundary = false,
  hoc = identity,
  component = TestLeaf
} = {}) => {
  const firebase = firebaseWithConfig()
  const store = storeWithFirestore()
  sinon.spy(store, 'dispatch')

  const WrappedComponent = hoc(component)

  class Container extends Component {
    state = { test: 'testing', dynamic: '' }

    constructor(props) {
      super(props)
      // eslint-disable-next-line react/prop-types
      this.state.dynamic = props.dynamic
      // remove rrf specific setting initialization
      delete firebase._
    }

    render() {
      let children = (
        <WrappedComponent
          {...this.props}
          dynamicProp={this.state.dynamic}
          testProp={this.state.test}
        />
      )
      if (withErrorBoundary) {
        children = <ErrorBoundary>{children}</ErrorBoundary>
      }
      return (
        <ReactReduxFirebaseProvider
          dispatch={store.dispatch}
          firebase={firebase}
          {...(withFirestore ? { createFirestoreInstance } : {})}
          config={{}}>
          {children}
        </ReactReduxFirebaseProvider>
      )
    }
  }
  const wrapper = mount(<Container {...additionalComponentProps} />)

  return {
    wrapper,
    leaf: wrapper.find(component),
    component: wrapper.find(WrappedComponent),
    dispatch: store.dispatch,
    firebase,
    store
  }
}

/**
 * Sleep/wait for a set amount of time
 * @param {number} ms - Amount of time to sleep
 * @returns {Promise} Resolves after timeout
 */
export function sleep(ms = 0) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
