import { set } from 'lodash'
import { firebaseStateReducer } from '../../src'
import { actionTypes } from '../../src/constants'

const initialState = {
  auth: { isLoaded: false, isEmpty: true },
  profile: { isLoaded: false, isEmpty: true },
  isInitializing: false,
  errors: [],
  data: {},
  listeners: { allIds: [], byId: {} },
  ordered: {},
  timestamps: {},
  requesting: {},
  requested: {}
}

const noError = { ...initialState, errors: [] }
const loadedState = {
  ...noError,
  auth: { isLoaded: true, isEmpty: true },
  profile: { isLoaded: true, isEmpty: true }
}
const exampleData = { some: 'data' }
const externalState = { data: { asdfasdf: {} } }

let path = 'test'
let childKey = 'abc'
let childPath = `${path}/${childKey}`
let action = {}
let childDotPath
const newData = { some: 'val' }
const profile = { email: 'test@test.com' }
const getDotPath = path => path.split('/').join('.')

describe('reducer', () => {
  it('is a function', () => {
    expect(firebaseStateReducer).to.be.a.function
  })

  it.skip('handles no initialState', () => {
    expect(firebaseStateReducer(undefined, {})).to.equal(initialState)
  })

  it('returns state by default', () => {
    expect(firebaseStateReducer(externalState, {}))
      .to.have.property('data', externalState.data)
  })

  beforeEach(() => {
    // reset defaults
    path = 'test'
    childKey = 'abc'
    childPath = `${path}/${childKey}`
    action = {}
    childDotPath = getDotPath(childPath)
  })

  describe('SET action', () => {
    it.skip('deletes data from state when data is null', () => {
      action = { type: actionTypes.SET, path: 'test' }
      expect(firebaseStateReducer({}, action))
        .to.deep.equal(initialState)
    })

    it('sets state', () => {
      action = { type: actionTypes.SET, path, data: exampleData }
      expect(firebaseStateReducer({}, action).data)
        .to.deep.equal({
          ...initialState.data,
          [path]: exampleData
        })
    })

    it('handles already existing parent of null', () => {
      action = { type: actionTypes.SET, path: childPath, data: exampleData }
      expect(firebaseStateReducer({ data: { test: null } }, action).data)
        .to.deep.equal(set({}, childDotPath, exampleData))
    })

    it('handles already existing value of null', () => {
      action = { type: actionTypes.SET, path: childPath, data: newData }
      expect(firebaseStateReducer({ data: { test: { [childKey]: null } } }, action).data)
        .to.deep.equal(set({}, childDotPath, newData))
    })
  })

  describe('NO_VALUE action', () => {
    it('sets path to null', () => {
      action = { type: actionTypes.NO_VALUE, path }
      expect(firebaseStateReducer({}, action).data)
        .to.deep.equal({ [path]: null })
    })
  })

  describe('UNSET_LISTENER action', () => {
    it('sets state', () => {
      action = { type: actionTypes.UNSET_LISTENER, path: 'asdfasdf', payload: { id: 1 } }
      expect(firebaseStateReducer({}, action))
        .to.deep.equal(initialState)
    })
  })

  describe('UNSET_LISTENER action', () => {
    action = { type: actionTypes.UNSET_LISTENER, path: 'asdfasdf', payload: { id: 1 } }
    it('sets state', () => {
      expect(firebaseStateReducer({}, action))
        .to.deep.equal(initialState)
    })
  })

  describe('SET_PROFILE action', () => {
    it('sets profile to state', () => {
      action = { type: actionTypes.SET_PROFILE, profile }
      expect(firebaseStateReducer({}, action)).to.deep.equal({
        ...initialState,
        profile: { ...profile, isLoaded: true, isEmpty: false }
      })
    })

    it('removes for no profile', () => {
      action = { type: actionTypes.SET_PROFILE }
      expect(firebaseStateReducer({}, action))
        .to.deep.equal({
          ...initialState,
          profile: { isLoaded: true, isEmpty: true }
        })
    })
  })

  describe('LOGOUT action', () => {
    it('sets state', () => {
      action = { type: actionTypes.LOGOUT }
      expect(firebaseStateReducer({}, action))
        .to.deep.equal(loadedState)
    })
  })

  describe('LOGIN action', () => {
    it('sets state', () => {
      const auth = { some: 'value' }
      action = { type: actionTypes.LOGIN, auth }
      expect(firebaseStateReducer({}, action))
        .to.deep.equal({
          ...noError,
          auth: { ...noError.auth, ...auth, isLoaded: true, isEmpty: false }
        })
    })
    it.skip('sets empty if auth not provided', () => {
      action = { type: actionTypes.LOGIN }
      expect(firebaseStateReducer({}, action))
        .to.deep.equal(noError)
    })
  })

  describe('LOGIN_ERROR action', () => {
    it('sets state', () => {
      expect(
        firebaseStateReducer(
          {},
          { type: actionTypes.LOGIN_ERROR }
        )
      ).to.deep.equal({
        ...initialState,
        auth: { isLoaded: true, isEmpty: true },
        profile: { isLoaded: true, isEmpty: true }
      })
    })
  })

  describe('AUTHENTICATION_INIT_STARTED action', () => {
    it('sets isInitializing to true', () => {
      action = { type: actionTypes.AUTHENTICATION_INIT_STARTED }
      expect(firebaseStateReducer({}, action))
        .to.have.property('isInitializing', true)
    })
  })

  describe('AUTHENTICATION_INIT_FINISHED action', () => {
    it('sets isInitializing to false', () => {
      action = { type: actionTypes.AUTHENTICATION_INIT_FINISHED }
      expect(firebaseStateReducer({}, action))
        .to.have.property('isInitializing', false)
    })
  })

  describe('UNAUTHORIZED_ERROR action', () => {
    it('sets state', () => {
      const authError = { some: 'error' }
      action = { type: actionTypes.UNAUTHORIZED_ERROR, authError }
      expect(firebaseStateReducer({}, action))
        .to.deep.equal({ ...initialState, errors: [authError] })
    })
  })

  describe('AUTH_UPDATE_SUCCESS action', () => {
    it('sets state', () => {
      const authUpdate = { email: 'newEmail' }
      action = { type: actionTypes.AUTH_UPDATE_SUCCESS, auth: authUpdate }
      expect(firebaseStateReducer({}, action))
        .to.deep.equal({
          ...noError,
          auth: {
            ...noError.auth,
            ...authUpdate,
            isEmpty: false,
            isLoaded: true
          }
        })
    })
    it('handles undefined auth', () => {
      action = { type: actionTypes.AUTH_UPDATE_SUCCESS }
      expect(firebaseStateReducer({}, action))
        .to.deep.equal({
          ...noError,
          auth: {
            isEmpty: true,
            isLoaded: true
          }
        })
    })
  })
})
