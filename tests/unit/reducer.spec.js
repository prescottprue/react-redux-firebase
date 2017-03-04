/* global describe expect it */
import { fromJS } from 'immutable'
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
const exampleState = fromJS({})
const exampleEmptyState = fromJS(emptyState)

describe('reducer', () => {
  it('is a function', () => {
    expect(firebaseStateReducer).to.be.a.function
  })

  it('handles no initialState', () => {
    expect(
      JSON.stringify(firebaseStateReducer(undefined, {}).toJS()))
      .to.equal(JSON.stringify(initialState))
  })

  it('returns state by default', () => {
    expect(firebaseStateReducer(exampleData))
      .to.equal(exampleData)
  })

  describe('SET action', () => {
    it('deletes data from state when data is null', () => {
      expect(
        firebaseStateReducer(
          exampleState,
          { type: actionTypes.SET, path: 'test' }
        )
      ).to.equal(exampleState)
    })
    it('sets state', () => {
      const path = 'test'
      const pathArray = path.split(/\//).filter(p => !!p)
      console.log('path:', { type: actionTypes.SET, path, data: {} })
      expect(
        JSON.stringify(firebaseStateReducer(
          exampleState,
          { type: actionTypes.SET, path, data: {} }
        ))
      ).to.equal(JSON.stringify(exampleState.setIn(['data', ...pathArray], fromJS({}))))
    })
  })

  describe('NO_VALUE action', () => {
    it('sets state', () => {
      expect(
        JSON.stringify(firebaseStateReducer(
          exampleState,
          { type: actionTypes.NO_VALUE, path: 'asdfasdf' }
        ).toJS())
      ).to.equal(JSON.stringify(externalState))
    })
  })

  describe('SET_PROFILE action', () => {
    it('sets state', () => {
      const profile = { email: 'test@test.com' }
      expect(
        JSON.stringify(firebaseStateReducer(
          exampleState,
          { type: actionTypes.SET_PROFILE, profile }
        ).toJS())
      ).to.equal(JSON.stringify({ profile }))
    })
    it('removes for no profile', () => {
      const profile = { email: 'test@test.com' }
      expect(
        JSON.stringify(firebaseStateReducer(
          exampleState,
          { type: actionTypes.SET_PROFILE }
        ).toJS())
      ).to.equal(JSON.stringify(exampleState.deleteIn(['profile'])))
    })
  })

  describe('LOGOUT action', () => {
    it('sets state', () => {
      expect(
        JSON.stringify(firebaseStateReducer(
          exampleState,
          { type: actionTypes.LOGOUT }
        ).toJS())
      ).to.equal(JSON.stringify({
        auth: null,
        authError: null,
        profile: null,
        isInitializing: false,
        data: {}
      }))
    })
  })

  describe('LOGIN action', () => {
    it('sets state', () => {
      expect(
        JSON.stringify(firebaseStateReducer(
          exampleState,
          { type: actionTypes.LOGIN }
        ).toJS())
      ).to.equal(JSON.stringify(noError))
    })
  })

  describe('LOGIN_ERROR action', () => {
    it('sets state', () => {
      expect(
        JSON.stringify(firebaseStateReducer(
          exampleState,
          { type: actionTypes.LOGIN_ERROR }
        ).toJS())
      ).to.equal(JSON.stringify(noAuth))
    })
  })

  describe('AUTHENTICATION_INIT_STARTED action', () => {
    it('sets state', () => {
      expect(
        JSON.stringify(firebaseStateReducer(
          exampleState,
          { type: actionTypes.AUTHENTICATION_INIT_STARTED }
        ).toJS())
      ).to.equal(JSON.stringify({
        isInitializing: true,
        data: {},
        timestamp: {},
        requesting: {},
        requested: {}
      }))
    })
  })

  describe('AUTHENTICATION_INIT_FINISHED action', () => {
    it('sets state', () => {
      expect(
        JSON.stringify(firebaseStateReducer(
          exampleState,
          { type: actionTypes.AUTHENTICATION_INIT_FINISHED }
        ).toJS())
      ).to.equal(
        JSON.stringify(
          exampleState.setIn(['isInitializing'], false).toJS()
        )
      )
    })
  })

  describe('UNAUTHORIZED_ERROR action', () => {
    it('sets state', () => {
      const authError = {}
      expect(
        JSON.stringify(firebaseStateReducer(
          exampleState,
          { type: actionTypes.UNAUTHORIZED_ERROR, authError }
        ).toJS())
      ).to.equal(
        JSON.stringify(
          exampleState.setIn(['authError'], authError).toJS()
        )
      )
    })
  })
})
