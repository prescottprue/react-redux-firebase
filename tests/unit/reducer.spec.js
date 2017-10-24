import { setWith } from 'lodash/fp'
import { actionTypes } from '../../src/constants'
import firebaseStateReducer, { getDotStrPath } from '../../src/reducer'

const initialState = {
  auth: { isLoaded: false, isEmpty: true },
  authError: null,
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

const noError = { ...initialState, errors: [], authError: null }
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
let initialData = {}
const newData = { some: 'val' }
const profile = { email: 'test@test.com' }

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
    childDotPath = getDotStrPath(childPath)
  })

  // TODO: Do not write empty path to state
  describe.skip('empty path', () => {
    it('empty path', () => {
      action = { type: actionTypes.START, profile }
      expect(firebaseStateReducer({}, action)).to.deep.equal({...initialState})
    })
  })

  describe('START action', () => {
    it('sets requested state for path', () => {
      action = { type: actionTypes.START, path: 'some' }
      expect(firebaseStateReducer({}, action))
        .to.have.deep.property(`requested.${action.path}`)
    })

    it('sets requesting state for path', () => {
      action = { type: actionTypes.START, path: 'some' }
      expect(firebaseStateReducer({}, action))
        .to.have.deep.property(`requesting.${action.path}`)
    })

    it('sets timestamps state for path', () => {
      action = { type: actionTypes.START, path: 'some' }
      expect(firebaseStateReducer({}, action))
        .to.have.deep.property(`timestamps.${action.path}`)
    })
  })

  // Skipped due to empty path being written in reducer (not expected)
  it.skip('handles undefined path', () => {
    expect(
      firebaseStateReducer(
        exampleData,
        { type: actionTypes.START }
      )
    ).to.equal({ ...noError, requested: { '': false } })
  })

  // Skipped due to empty path being written in reducer (not expected)
  describe.skip('START action', () => {
    describe('sets requesting and requested when they are', () => {
      it('empty', () => {
        expect(
          firebaseStateReducer(
            exampleData,
            { type: actionTypes.START, path: 'test' }
          )
        ).to.equal(noError)
      })

      it('already set', () => {
        expect(
          firebaseStateReducer(
            exampleData,
            { type: actionTypes.START, path: 'test' }
          )
        ).to.equal(noError)
      })
    })
  })

  describe('SET action', () => {
    it.skip('deletes data from state when data is null', () => {
      action = { type: actionTypes.SET, path: 'test' }
      expect(firebaseStateReducer({}, action))
        .to.deep.equal(initialState)
    })

    it('sets data to state under path', () => {
      action = { type: actionTypes.SET, path, data: exampleData }
      expect(firebaseStateReducer({}, action).data)
        .to.deep.equal({
          ...initialState.data,
          [path]: exampleData
        })
    })

    it('sets data to state under paths that end in a number', () => {
      action = { type: actionTypes.SET, path: 'test/123', data: exampleData }
      expect(firebaseStateReducer({}, action).data)
        .to.deep.equal({
          ...initialState.data,
          test: {
            123: exampleData
          }
        })
    })

    it('sets data to path with already existing data', () => {
      initialData = { data: { test: { [childKey]: { foo1: 'bar1' } } } }
      action = { type: actionTypes.SET, path: childPath, data: { foo2: 'bar2' } }
      expect(firebaseStateReducer(initialData, action).data)
        .to.deep.equal({
          ...initialState.data,
          test: {
            [childKey]: {
              foo2: 'bar2'
            }
          }
        })
    })

    it('sets data to path with already existing data with numeric keys', () => {
      initialData = { data: { test: { [childKey]: { 123: 'bar1' } } } }
      action = { type: actionTypes.SET, path: childPath, data: { 124: 'bar2' } }
      expect(firebaseStateReducer(initialData, action).data)
        .to.deep.equal({
          ...initialState.data,
          test: {
            [childKey]: {
              124: 'bar2'
            }
          }
        })
    })

    it('sets data to path with already existing value of null', () => {
      initialData = { data: { test: { [childKey]: null } } }
      action = { type: actionTypes.SET, path: childPath, data: newData }
      expect(firebaseStateReducer(initialData, action).data)
        .to.deep.equal(setWith(Object, childDotPath, newData, {}))
    })

    it('sets data to path with already existing parent of null', () => {
      initialData = { data: { test: null } }
      action = { type: actionTypes.SET, path: childPath, data: exampleData }
      expect(firebaseStateReducer(initialData, action).data)
        .to.deep.equal(setWith(Object, childDotPath, exampleData, {}))
    })
  })

  describe('MERGE action', () => {
    it.skip('deletes data from state when data is null', () => {
      action = { type: actionTypes.MERGE, path: 'test' }
      expect(firebaseStateReducer({}, action))
        .to.deep.equal(initialState)
    })

    it('merge data to empty state under path', () => {
      action = { type: actionTypes.MERGE, path, data: exampleData }
      expect(firebaseStateReducer({}, action).data)
        .to.deep.equal({
          ...initialState.data,
          [path]: exampleData
        })
    })

    it('merge data to empty state under paths that end in a number', () => {
      action = { type: actionTypes.MERGE, path: 'test/123', data: exampleData }
      expect(firebaseStateReducer({}, action).data)
        .to.deep.equal({
          ...initialState.data,
          test: {
            123: exampleData
          }
        })
    })

    it('merges data to path with already existing data', () => {
      initialData = { data: { test: { [childKey]: { foo1: 'bar1' } } } }
      action = { type: actionTypes.MERGE, path: childPath, data: { foo2: 'bar2' } }
      expect(firebaseStateReducer(initialData, action).data)
        .to.deep.equal({
          ...initialState.data,
          test: {
            [childKey]: {
              foo1: 'bar1',
              foo2: 'bar2'
            }
          }
        })
    })

    it('merges data to path with already existing data with numeric keys', () => {
      initialData = { data: { test: { [childKey]: { 123: 'bar1' } } } }
      action = { type: actionTypes.MERGE, path: childPath, data: { 124: 'bar2' } }
      expect(firebaseStateReducer(initialData, action).data)
        .to.deep.equal({
          ...initialState.data,
          test: {
            [childKey]: {
              123: 'bar1',
              124: 'bar2'
            }
          }
        })
    })

    it('merge data to path with already existing value of null', () => {
      initialData = { data: { test: { [childKey]: null } } }
      action = { type: actionTypes.MERGE, path: childPath, data: newData }
      expect(firebaseStateReducer(initialData, action).data)
        .to.deep.equal(setWith(Object, childDotPath, newData, {}))
    })

    it('merge data to path with already existing parent of null', () => {
      initialData = { data: { test: null } }
      action = { type: actionTypes.MERGE, path: childPath, data: exampleData }
      expect(firebaseStateReducer(initialData, action).data)
        .to.deep.equal(setWith(Object, childDotPath, exampleData, {}))
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

    it('supports preserving certain data in state', () => {
      const preservePath = 'todos'
      const todos = [{ a: 'todo' }]
      initialData = { data: { [preservePath]: todos } }
      action = { type: actionTypes.LOGOUT, preserve: [preservePath] }
      // load todos into state and confirm they are kept on logout
      expect(firebaseStateReducer(initialData, action).data)
        .to.have.property(preservePath, todos)
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

  describe('REMOVE action', () => {
    it('sets data state to undefined', () => {
      const path = 'test'
      action = { type: actionTypes.REMOVE, path }
      expect(firebaseStateReducer({}, action))
        .to.deep.equal({
          ...initialState,
          data: { [path]: undefined },
          ordered: { [path]: undefined }
        })
    })
    it('sets ordered state to undefined', () => {
      const path = 'test'
      action = { type: actionTypes.REMOVE, path }
      expect(firebaseStateReducer({}, action))
        .to.deep.equal({
          ...initialState,
          data: { [path]: undefined },
          ordered: { [path]: undefined }
        })
    })
  })

  describe('AUTH_EMPTY_CHANGE action', () => {
    it('sets auth.isLoaded: true to state', () => {
      action = { type: actionTypes.AUTH_EMPTY_CHANGE }
      expect(firebaseStateReducer({}, action))
        .to.deep.equal({
          ...initialState,
          auth: { isLoaded: true, isEmpty: true }
        })
    })
    it('removes existing auth state', () => {
      const auth = { some: 'value' }
      action = { type: actionTypes.AUTH_EMPTY_CHANGE, auth }
      expect(firebaseStateReducer({}, action))
        .to.deep.equal({
          ...initialState,
          auth: { isLoaded: true, isEmpty: true }
        })
    })
  })

  describe('LOGIN_ERROR action', () => {
    it('sets state', () => {
      const authError = { some: 'error' }
      expect(
        firebaseStateReducer(
          {},
          { type: actionTypes.LOGIN_ERROR, authError }
        )
      ).to.deep.equal({
        ...initialState,
        auth: { isLoaded: true, isEmpty: true },
        profile: { isLoaded: false, isEmpty: true },
        errors: [ authError ],
        authError
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
        .to.deep.equal({ ...initialState, errors: [authError], authError })
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
          },
          authError: null
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
          },
          authError: null
        })
    })
  })

  describe('SET_LISTENER action', () => {
    it('sets id to allIds in listeners state', () => {
      action = { type: actionTypes.SET_LISTENER, path: 'test', payload: { id: 'asdf' } }
      expect(firebaseStateReducer({}, action))
        .to.have.deep.property('listeners.allIds.0', 'asdf')
    })

    it('sets listener data to byId in listeners state', () => {
      const path = 'test'
      const id = 'asdf'
      action = { type: actionTypes.SET_LISTENER, path, payload: { id } }
      expect(firebaseStateReducer({}, action))
        .to.have.deep.property(`listeners.byId.${id}.path`, path)
    })
  })

  describe('CLEAR_ERRORS action', () => {
    it('clears errors', () => {
      action = { type: actionTypes.CLEAR_ERRORS }
      expect(firebaseStateReducer({ errors: [{test: 'test'}] }, action).errors)
        .to.have.a.lengthOf(0)
    })

    describe('preserve option', () => {
      it('passes through non object preserve parameters (backwards compatibility)', () => {
        action = { type: actionTypes.CLEAR_ERRORS, preserve: [] }
        expect(firebaseStateReducer({ errors: [{test: 'test'}] }, action).errors)
          .to.have.a.lengthOf(0)
      })

      it('supports perserving data through the perserve parameter', () => {
        action = { type: actionTypes.CLEAR_ERRORS, preserve: { errors: () => true } }
        expect(firebaseStateReducer({ errors: [{test: 'test'}] }, action).errors)
          .to.have.a.lengthOf(1)
      })

      it('throws for non function preserve values', () => {
        action = { type: actionTypes.CLEAR_ERRORS, preserve: { errors: true } }
        expect(() => firebaseStateReducer({ errors: [{test: 'test'}] }, action))
          .to.Throw('Preserve for the errors state currently only supports functions')
      })
    })
  })

  describe('UNSET_LISTENER action', () => {
    it('removes id from allIds in listeners state', () => {
      const id = 'asdf'
      const path = 'test'
      initialData = {
        listeners: { allIds: [id] }
      }
      action = { type: actionTypes.UNSET_LISTENER, path, payload: { id: 'asdf' } }
      expect(firebaseStateReducer(initialData, action).listeners)
        .to.deep.equal({ allIds: [], byId: {} })
    })

    it('removes id from byId in listeners state', () => {
      const path = 'test'
      const id = 'asdf'
      action = { type: actionTypes.UNSET_LISTENER, path, payload: { id } }
      initialData = {
        listeners: { byId: { [id]: { id, path } } }
      }
      expect(firebaseStateReducer(initialData, action).listeners)
        .to.deep.equal({ allIds: [], byId: {} })
    })
  })
})
