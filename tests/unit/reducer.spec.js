import { firebaseStateReducer } from '../../src'
import { actionTypes } from '../../src/constants'
const emptyState = {
  auth: undefined,
  authError: undefined,
  profile: undefined,
  isInitializing: undefined,
  data: {}
}
const initialState = {
  auth: undefined,
  authError: undefined,
  profile: undefined,
  isInitializing: undefined,
  data: {},
  timestamp: {},
  requesting: {},
  requested: {}
}
const intializedState = Object.assign({}, initialState, { isInitializing: true })
const noError = { authError: null }
const noAuth = { auth: null, profile: null }
const exampleData = { some: 'data' }
const externalState = { data: { asdfasdf: {} } }
const exampleState = {}
const exampleEmptyState = emptyState

describe('reducer', () => {
  it('is a function', () => {
    expect(firebaseStateReducer).to.be.a.function
  })

  it('handles no initialState', () => {
    expect(firebaseStateReducer(undefined, {})).to.equal(initialState)
  })

  it('returns state by default', () => {
    expect(firebaseStateReducer(exampleData)).to.equal(exampleData)
  })

  describe('SET action', () => {
    it('deletes data from state when data is null', () => {
      expect(
        firebaseStateReducer(exampleState,
          { type: actionTypes.SET, path: 'test' }
        )
      ).to.equal(exampleState)
    })

    it('sets state', () => {
      const path = 'test'
      const pathArray = path.split(/\//).filter(p => !!p)
      expect(
        firebaseStateReducer(
          exampleState,
          { type: actionTypes.SET, path, data: {} }
        )
      ).to.equal(exampleState.setIn(['data', ...pathArray], {}))
    })
    it('handles already existing parent that is null', () => {
      const childPath = 123
      const path = `test/${childPath}`
      const pathArray = path.split(/\//).filter(p => !!p)
      const newData = { some: 'val' }
      expect(
        firebaseStateReducer(
          {data: { test: null } },
          { type: actionTypes.SET, path, data: newData }
        )
      ).to.equal(exampleState.data,newData)
    })

    it('handles already existing value of null', () => {
      const path = 'test/123'
      const pathArray = path.split(/\//).filter(p => !!p)
      const newData = { some: 'val' }
      expect(
        firebaseStateReducer(
          { data: { test: { '123': null } } },
          { type: actionTypes.SET, path, data: newData }
        )
      ).to.equal(exampleState.data[pathArray],newData)
    })
  })

  describe('NO_VALUE action', () => {
    it('sets state', () => {
      expect(
        firebaseStateReducer(
          exampleState,
          { type: actionTypes.NO_VALUE, path: 'asdfasdf' }
        )
      ).to.equal(externalState)
    })
  })

  describe('UNSET_LISTENER action', () => {
    it('sets state', () => {
      expect(
        firebaseStateReducer(
          exampleState,
          { type: actionTypes.UNSET_LISTENER, path: 'asdfasdf' }
        )
      ).to.equal({})
    })
  })

  describe('SET_PROFILE action', () => {
    it('sets state', () => {
      const profile = { email: 'test@test.com' }
      expect(
        firebaseStateReducer(
          exampleState,
          { type: actionTypes.SET_PROFILE, profile }
        )
      ).to.equal({ profile })
    })
    it('removes for no profile', () => {
      const profile = { email: 'test@test.com' }
      expect(
        firebaseStateReducer(
          exampleState,
          { type: actionTypes.SET_PROFILE }
        )
      ).to.equal(exampleState.deleteIn(['profile']))
    })
  })

  describe('LOGOUT action', () => {
    it('sets state', () => {
      expect(
        firebaseStateReducer(
          exampleState,
          { type: actionTypes.LOGOUT }
        )
      ).to.equal({
        auth: null,
        authError: null,
        profile: null,
        isInitializing: false,
        data: {}
      })
    })
  })

  describe('LOGIN action', () => {
    it('sets state', () => {
      expect(
        firebaseStateReducer(
          exampleState,
          { type: actionTypes.LOGIN }
        )
      ).to.equal(noError)
    })
  })

  describe('LOGIN_ERROR action', () => {
    it('sets state', () => {
      expect(
        firebaseStateReducer(
          exampleState,
          { type: actionTypes.LOGIN_ERROR }
        )
      ).to.equal(noAuth)
    })
  })

  describe('AUTHENTICATION_INIT_STARTED action', () => {
    it('sets state', () => {
      expect(
        firebaseStateReducer(
          exampleState,
          { type: actionTypes.AUTHENTICATION_INIT_STARTED }
        )
      ).to.equal({
        isInitializing: true,
        data: {},
        timestamp: {},
        requesting: {},
        requested: {}
      })
    })
  })

  describe('AUTHENTICATION_INIT_FINISHED action', () => {
    it('sets state', () => {
      expect(
        firebaseStateReducer(
          exampleState,
          { type: actionTypes.AUTHENTICATION_INIT_FINISHED }
        )
      ).to.equal(exampleState, false)
    })
  })

  describe('UNAUTHORIZED_ERROR action', () => {
    it('sets state', () => {
      const authError = {}
      expect(
        firebaseStateReducer(
          exampleState,
          { type: actionTypes.UNAUTHORIZED_ERROR, authError }
        )
      ).to.equal(exampleState, authError)
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
      ).to.equal(exampleState, authUpdate)
    })
  })
})
