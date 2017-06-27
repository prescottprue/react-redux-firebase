import { firebaseStateReducer } from '../../src'
import { actionTypes } from '../../src/constants'
import { set } from 'lodash'

const emptyState = {
  auth: { isLoaded: false },
  profile: { isLoaded: false },
  isInitializing: false,
  data: {}
}

const initialState = {
  auth: { isLoaded: false },
  profile: { isLoaded: false },
  isInitializing: false,
  errors: [],
  data: {},
  timestamps: {},
  requesting: {},
  requested: {}
}

const noError = { ...initialState, errors: [] }
const loadedState = {
  ...noError,
  auth: { isLoaded: true },
  profile: { isLoaded: true }
}
const exampleData = { some: 'data' }
const externalState = { data: { asdfasdf: {} } }
const exampleState = {}
const exampleEmptyState = emptyState

let path = 'test'
let childKey = 'abc'
let childPath = `${path}/${childKey}`
let action = {}
let state = {}
const newData = { some: 'val' }

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
  })

  describe('SET action', () => {
    it.skip('deletes data from state when data is null', () => {
      action = { type: actionTypes.SET, path: 'test' }
      expect(
        firebaseStateReducer(exampleState, action)
      ).to.deep.equal(initialState)
    })

    it('sets state', () => {
      action = { type: actionTypes.SET, path, data: exampleData }
      expect(
        firebaseStateReducer(exampleState, action).data
      ).to.deep.equal({ ...initialState.data, [path]: exampleData })
    })

    it('handles already existing parent of null', () => {
      action = { type: actionTypes.SET, path: childPath, data: exampleData }
      const dotChildPath = childPath.split('/').join('.')
      expect(
        firebaseStateReducer({data: { test: null } }, action).data
      ).to.deep.equal(set({}, dotChildPath, exampleData))
    })

    it('handles already existing value of null', () => {
      action = { type: actionTypes.SET, path: childPath, data: newData }
      const dotChildPath = childPath.split('/').join('.')
      expect(
        firebaseStateReducer({ data: { test: { [childKey]: null } } }, action).data
      ).to.deep.equal(set({}, dotChildPath, newData))
    })

  })

  describe('NO_VALUE action', () => {
    it('sets state', () => {
      action = { type: actionTypes.NO_VALUE, path: 'asdfasdf' }
      expect(
        firebaseStateReducer({}, action).data
      ).to.deep.equal(externalState.data)
    })
  })

  describe('UNSET_LISTENER action', () => {
    it('sets state', () => {
      action = { type: actionTypes.UNSET_LISTENER, path: 'asdfasdf' }
      expect(
        firebaseStateReducer(exampleState, action)
      ).to.deep.equal(initialState)
    })
  })

  describe('UNSET_LISTENER action', () => {
    action = { type: actionTypes.UNSET_LISTENER, path: 'asdfasdf' }
    it('sets state', () => {
      expect(
        firebaseStateReducer(exampleState, action)
      ).to.deep.equal(initialState)
    })
  })

  describe('SET_PROFILE action', () => {
    it('sets state', () => {
      const profile = { email: 'test@test.com' }
      action = { type: actionTypes.SET_PROFILE, profile }
      expect(
        firebaseStateReducer(exampleState, action)
      ).to.deep.equal({ ...initialState, profile: { ...profile, isLoaded: true } })
    })

    it('removes for no profile', () => {
      const profile = { email: 'test@test.com' }
      expect(
        firebaseStateReducer(
          exampleState,
          { type: actionTypes.SET_PROFILE }
        )
      ).to.deep.equal({ ...initialState, profile: { isLoaded: true } })
    })
  })

  describe('LOGOUT action', () => {
    it('sets state', () => {
      expect(
        firebaseStateReducer(
          exampleState,
          { type: actionTypes.LOGOUT }
        )
      ).to.deep.equal(loadedState)
    })
  })

  describe('LOGIN action', () => {
    it('sets state', () => {
      expect(
        firebaseStateReducer(
          exampleState,
          { type: actionTypes.LOGIN }
        )
      ).to.deep.equal(noError)
    })
  })

  describe('LOGIN_ERROR action', () => {
    it('sets state', () => {
      expect(
        firebaseStateReducer(
          exampleState,
          { type: actionTypes.LOGIN_ERROR }
        )
      ).to.deep.equal({
        ...initialState,
        auth: { isLoaded: true },
        profile: { isLoaded: true }
      })
    })
  })

  describe('AUTHENTICATION_INIT_STARTED action', () => {
    it('sets isInitializing to true', () => {
      expect(
        firebaseStateReducer(
          exampleState,
          { type: actionTypes.AUTHENTICATION_INIT_STARTED }
        )
      ).to.have.property('isInitializing', true)
    })
  })

  describe('AUTHENTICATION_INIT_FINISHED action', () => {
    it('sets isInitializing to false', () => {
      expect(
        firebaseStateReducer(
          exampleState,
          { type: actionTypes.AUTHENTICATION_INIT_FINISHED }
        )
      ).to.have.property('isInitializing', false)
    })
  })

  describe('UNAUTHORIZED_ERROR action', () => {
    it('sets state', () => {
      const authError = { some: 'error' }
      expect(
        firebaseStateReducer(
          exampleState,
          { type: actionTypes.UNAUTHORIZED_ERROR, authError }
        )
      ).to.deep.equal({ ...initialState, errors: [authError] })
    })
  })

  describe('AUTH_UPDATE_SUCCESS action', () => {
    it('sets state', () => {
      const authUpdate = { email: 'newEmail' }
      expect(
        firebaseStateReducer(
          exampleState,
          { type: actionTypes.AUTH_UPDATE_SUCCESS, payload: authUpdate }
        )
      ).to.deep.equal(initialState)
    })
  })

  describe('AUTH_UPDATE_SUCCESS action', () => {
    it('sets state', () => {
      const authUpdate = { email: 'newEmail' }
      action = { type: actionTypes.AUTH_UPDATE_SUCCESS, payload: authUpdate }
      expect(
        firebaseStateReducer(exampleState, action)
      ).to.deep.equal({ ...initialState })
    })
  })
})
