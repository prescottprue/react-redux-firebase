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
const intializedState = { isInitializing: true, data: {} }
const noError = {"authError":null}
const noAuth = { auth: null, profile: null }
const exampleData = { some: 'data' }
const externalState = {data: { asdfasdf: {} }}
const exampleState = fromJS({})

describe('reducer', () => {
  it('is a function', () => {
    expect(firebaseStateReducer)
      .to.be.a.function
  })

  it('returns state by default', () => {
    expect(firebaseStateReducer(exampleData))
      .to.equal(exampleData)
  })

  describe('SET action', () => {
    it('handles SET action', () => {
      expect(
        firebaseStateReducer(
          exampleState,
          { type: actionTypes.SET, path: 'asdfasdf' }
        )
      ).to.equal(exampleState)
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
  })

  describe('LOGOUT action', () => {
    it('sets state', () => {
      expect(
        JSON.stringify(firebaseStateReducer(
          exampleState,
          { type: actionTypes.LOGOUT }
        ).toJS())
      ).to.equal(JSON.stringify({"auth":null,"authError":null,"profile":null,"isLoading":false,"data":{}}))
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
      ).to.equal(JSON.stringify(intializedState))
    })
  })
  describe('AUTHENTICATION_INIT_FINISHED action', () => {
    it('sets state', () => {
      expect(
        JSON.stringify(firebaseStateReducer(
          exampleState,
          { type: actionTypes.AUTHENTICATION_INIT_STARTED }
        ).toJS())
      ).to.equal(JSON.stringify(intializedState))
    })
  })
})
