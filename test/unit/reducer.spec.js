import { setWith } from 'lodash/fp'
import { actionTypes } from '../../src/constants'
import firebaseReducer from '../../src/reducer'
import { getDotStrPath } from '../../src/utils/reducers'

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

const testData = {
  level0: {
    level1_item0: {
      level2_item0: {
        level3_item0: {
          level4_item0: 'test'
        }
      }
    },
    level1_item1: 'test'
  }
}
const noError = { ...initialState, errors: [], authError: null }
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
    expect(firebaseReducer).to.be.a.function
  })

  describe('throws for invalid initial state', () => {
    it('in errors', () => {
      action = { type: actionTypes.UNAUTHORIZED_ERROR }
      expect(() => firebaseReducer({ errors: null }, action)).to.throw(
        'Errors state must be an array'
      )
    })
  })

  it.skip('handles no initialState', () => {
    expect(firebaseReducer(undefined, {})).to.equal(initialState)
  })

  it('returns state by default', () => {
    expect(firebaseReducer(externalState, {})).to.have.property(
      'data',
      externalState.data
    )
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
      expect(firebaseReducer({}, action)).to.deep.equal({ ...initialState })
    })
  })

  describe('START action', () => {
    it('sets requested state for path', () => {
      action = { type: actionTypes.START, path: 'some' }
      expect(firebaseReducer({}, action)).to.have.deep.property(
        `requested.${action.path}`
      )
    })

    it('sets requesting state for path', () => {
      action = { type: actionTypes.START, path: 'some' }
      expect(firebaseReducer({}, action)).to.have.deep.property(
        `requesting.${action.path}`
      )
    })

    it('sets timestamps state for path', () => {
      action = { type: actionTypes.START, path: 'some' }
      expect(firebaseReducer({}, action)).to.have.deep.property(
        `timestamps.${action.path}`
      )
    })
  })

  // Skipped due to empty path being written in reducer (not expected)
  it.skip('handles undefined path', () => {
    expect(firebaseReducer(exampleData, { type: actionTypes.START })).to.equal({
      ...noError,
      requested: { '': false }
    })
  })

  // Skipped due to empty path being written in reducer (not expected)
  describe.skip('START action', () => {
    describe('sets requesting and requested when they are', () => {
      it('empty', () => {
        expect(
          firebaseReducer(exampleData, {
            type: actionTypes.START,
            path: 'test'
          })
        ).to.equal(noError)
      })

      it('already set', () => {
        expect(
          firebaseReducer(exampleData, {
            type: actionTypes.START,
            path: 'test'
          })
        ).to.equal(noError)
      })
    })
  })

  describe('SET action', () => {
    it.skip('deletes data from state when data is null', () => {
      action = { type: actionTypes.SET, path: 'test' }
      expect(firebaseReducer({}, action)).to.deep.equal(initialState)
    })

    it('sets data to state under path', () => {
      action = { type: actionTypes.SET, path, data: exampleData }
      expect(firebaseReducer({}, action).data).to.deep.equal({
        ...initialState.data,
        [path]: exampleData
      })
    })

    it('sets data to state under paths that end in a number', () => {
      action = { type: actionTypes.SET, path: 'test/123', data: exampleData }
      expect(firebaseReducer({}, action).data).to.deep.equal({
        ...initialState.data,
        test: {
          123: exampleData
        }
      })
    })

    it('sets data to path with already existing data', () => {
      initialData = { data: { test: { [childKey]: { foo1: 'bar1' } } } }
      action = {
        type: actionTypes.SET,
        path: childPath,
        data: { foo2: 'bar2' }
      }
      expect(firebaseReducer(initialData, action).data).to.deep.equal({
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
      expect(firebaseReducer(initialData, action).data).to.deep.equal({
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
      expect(firebaseReducer(initialData, action).data).to.deep.equal(
        setWith(Object, childDotPath, newData, {})
      )
    })

    it('sets data to path with already existing parent of null', () => {
      initialData = { data: { test: null } }
      action = { type: actionTypes.SET, path: childPath, data: exampleData }
      expect(firebaseReducer(initialData, action).data).to.deep.equal(
        setWith(Object, childDotPath, exampleData, {})
      )
    })
  })

  describe('MERGE action -', () => {
    it.skip('deletes data from state when data is null', () => {
      action = { type: actionTypes.MERGE, path: 'test' }
      expect(firebaseReducer({}, action)).to.deep.equal(initialState)
    })

    it('merge data to empty state under path', () => {
      action = { type: actionTypes.MERGE, path, data: exampleData }
      expect(firebaseReducer({}, action).data).to.deep.equal({
        ...initialState.data,
        [path]: exampleData
      })
    })

    it('merge data to empty state under paths that end in a number', () => {
      action = { type: actionTypes.MERGE, path: 'test/123', data: exampleData }
      expect(firebaseReducer({}, action).data).to.deep.equal({
        ...initialState.data,
        test: {
          123: exampleData
        }
      })
    })

    it('merges data to path with already existing data', () => {
      initialData = { data: { test: { [childKey]: { foo1: 'bar1' } } } }
      action = {
        type: actionTypes.MERGE,
        path: childPath,
        data: { foo2: 'bar2' }
      }
      expect(firebaseReducer(initialData, action).data).to.deep.equal({
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
      action = {
        type: actionTypes.MERGE,
        path: childPath,
        data: { 124: 'bar2' }
      }
      expect(firebaseReducer(initialData, action).data).to.deep.equal({
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
      expect(firebaseReducer(initialData, action).data).to.deep.equal(
        setWith(Object, childDotPath, newData, {})
      )
    })

    it('merge data to path with already existing parent of null', () => {
      initialData = { data: { test: null } }
      action = { type: actionTypes.MERGE, path: childPath, data: exampleData }
      expect(firebaseReducer(initialData, action).data).to.deep.equal(
        setWith(Object, childDotPath, exampleData, {})
      )
    })
  })

  describe('NO_VALUE action -', () => {
    it('sets path to null', () => {
      action = { type: actionTypes.NO_VALUE, path }
      expect(firebaseReducer({}, action).data).to.deep.equal({ [path]: null })
    })
  })

  describe('UNSET_LISTENER action -', () => {
    it('sets state', () => {
      action = {
        type: actionTypes.UNSET_LISTENER,
        path: 'asdfasdf',
        payload: { id: 1 }
      }
      expect(firebaseReducer({}, action)).to.deep.equal(initialState)
    })
  })

  describe('UNSET_LISTENER action -', () => {
    action = {
      type: actionTypes.UNSET_LISTENER,
      path: 'asdfasdf',
      payload: { id: 1 }
    }
    it('sets state', () => {
      expect(firebaseReducer({}, action)).to.deep.equal(initialState)
    })
  })

  describe('SET_PROFILE action -', () => {
    it('sets profile to state', () => {
      action = { type: actionTypes.SET_PROFILE, profile }
      expect(firebaseReducer({}, action)).to.deep.equal({
        ...initialState,
        profile: { ...profile, isLoaded: true, isEmpty: false }
      })
    })

    it('removes for no profile', () => {
      action = { type: actionTypes.SET_PROFILE }
      expect(firebaseReducer({}, action)).to.deep.equal({
        ...initialState,
        profile: { isLoaded: true, isEmpty: true }
      })
    })
  })

  describe('LOGOUT action -', () => {
    it('resets data state to {}', () => {
      action = { type: actionTypes.LOGOUT }
      const res = firebaseReducer({ data: { todos: [{}] } }, action)
      expect(res).to.have.property('data')
      expect(res.data).to.be.empty
    })

    it('resets ordered state to {}', () => {
      action = { type: actionTypes.LOGOUT }
      const res = firebaseReducer({ ordered: { todos: [{}] } }, action)
      expect(res).to.have.property('ordered')
      expect(res.ordered).to.be.empty
    })

    it('clears auth state', () => {
      action = { type: actionTypes.LOGOUT }
      const res = firebaseReducer({ auth: { isEmpty: false } }, action)
      expect(res).to.have.deep.property('auth.isLoaded', true)
      expect(res).to.have.deep.property('auth.isEmpty', true)
    })

    describe('preserve parameter preserves', () => {
      describe('state.data when provided a', () => {
        it('array', () => {
          const preservePath = 'todos'
          const todos = [{ a: 'todo' }]
          initialData = { data: { [preservePath]: todos } }
          action = { type: actionTypes.LOGOUT, preserve: [preservePath] }
          // load todos into state and confirm they are kept on logout
          expect(firebaseReducer(initialData, action)).to.have.deep.property(
            `data.${preservePath}`,
            todos
          )
        })

        it('an object with a function', () => {
          const preservePath = 'todos'
          const todos = [{ a: 'todo' }]
          initialData = { data: { [preservePath]: todos } }
          action = {
            type: actionTypes.LOGOUT,
            preserve: { data: state => state }
          }
          // load todos into state and confirm they are kept on logout
          expect(firebaseReducer(initialData, action)).to.have.deep.property(
            `data.${preservePath}`,
            todos
          )
        })
      })

      describe('state.ordered when provided a', () => {
        it('array', () => {
          const preservePath = 'todos'
          const todos = [{ a: 'todo' }]
          initialData = { ordered: { todos } }
          action = {
            type: actionTypes.LOGOUT,
            preserve: { ordered: [preservePath] }
          }
          // load todos into state and confirm they are kept on logout
          expect(firebaseReducer(initialData, action)).to.have.deep.property(
            `ordered.${preservePath}`,
            todos
          )
        })

        it('array', () => {
          const preservePath = 'todos'
          const todos = [{ a: 'todo' }]
          initialData = { ordered: { todos } }
          action = {
            type: actionTypes.LOGOUT,
            preserve: { ordered: state => state }
          }
          // load todos into state and confirm they are kept on logout
          expect(firebaseReducer(initialData, action)).to.have.deep.property(
            `ordered.${preservePath}`,
            todos
          )
        })
      })

      describe('preserve parameter preserves', () => {
        describe('state.auth when', () => {
          it('it is an array', () => {
            const preservePath = 'displayName'
            const displayName = 'tester'
            initialData = { auth: { isEmpty: false, displayName } }
            action = {
              type: actionTypes.LOGOUT,
              preserve: { auth: [preservePath] }
            }
            // load todos into state and confirm they are kept on logout
            expect(firebaseReducer(initialData, action)).to.have.deep.property(
              `auth.${preservePath}`,
              displayName
            )
          })

          it('it is a function', () => {
            const preservePath = 'displayName'
            const displayName = 'tester'
            initialData = { auth: { isEmpty: false, displayName } }
            action = {
              type: actionTypes.LOGOUT,
              preserve: { auth: (state, nextState) => state }
            }
            // load todos into state and confirm they are kept on logout
            expect(firebaseReducer(initialData, action)).to.have.deep.property(
              `auth.${preservePath}`,
              displayName
            )
          })

          it('it is a boolean', () => {
            const preservePath = 'displayName'
            const displayName = 'tester'
            initialData = { auth: { isEmpty: false, displayName } }
            action = {
              type: actionTypes.LOGOUT,
              preserve: { auth: true }
            }
            // load todos into state and confirm they are kept on logout
            expect(firebaseReducer(initialData, action)).to.have.deep.property(
              `auth.${preservePath}`,
              displayName
            )
          })
        })
      })

      describe('preserve parameter preserves', () => {
        describe('state.profile when', () => {
          it('it is an array', () => {
            const preservePath = 'displayName'
            const displayName = 'tester'
            initialData = { profile: { isEmpty: false, displayName } }
            action = {
              type: actionTypes.LOGOUT,
              preserve: { profile: [preservePath] }
            }
            // load todos into state and confirm they are kept on logout
            expect(firebaseReducer(initialData, action)).to.have.deep.property(
              `profile.${preservePath}`,
              displayName
            )
          })

          it('it is a function', () => {
            const preservePath = 'displayName'
            const displayName = 'tester'
            initialData = { profile: { isEmpty: false, displayName } }
            action = {
              type: actionTypes.LOGOUT,
              preserve: { profile: [preservePath] }
            }
            // load todos into state and confirm they are kept on logout
            expect(firebaseReducer(initialData, action)).to.have.deep.property(
              `profile.${preservePath}`,
              displayName
            )
          })

          it('it is a boolean', () => {
            const preservePath = 'displayName'
            const displayName = 'tester'
            initialData = { profile: { isEmpty: false, displayName } }
            action = {
              type: actionTypes.LOGOUT,
              preserve: { profile: true }
            }
            // load todos into state and confirm they are kept on logout
            expect(firebaseReducer(initialData, action)).to.have.deep.property(
              `profile.${preservePath}`,
              displayName
            )
          })
        })
      })

      it('throws for invalid preserve parameter', () => {
        const todos = [{ a: 'todo' }]
        initialData = { ordered: { todos } }
        action = { type: actionTypes.LOGOUT, preserve: 'ordered.todos' }
        // load todos into state and confirm they are kept on logout
        expect(() => firebaseReducer(initialData, action)).to.throw(
          'Invalid preserve parameter. It must be an Object or an Array'
        )
      })
    })
  })

  describe('LOGIN action -', () => {
    it('sets auth state to isLoaded: true, isEmpty: false', () => {
      const auth = { some: 'value' }
      action = { type: actionTypes.LOGIN, auth }
      const currentState = firebaseReducer({}, action)
      expect(currentState).to.have.deep.property('auth.isLoaded', true)
      expect(currentState).to.have.deep.property('auth.isEmpty', false)
    })

    // For details view https://github.com/prescottprue/react-redux-firebase/issues/301
    it('sets profile state to isLoaded: false, isEmpty: true', () => {
      const auth = { some: 'value' }
      action = { type: actionTypes.LOGIN, auth }
      const currentState = firebaseReducer({}, action)
      expect(currentState).to.have.deep.property('profile.isLoaded', false)
      expect(currentState).to.have.deep.property('profile.isEmpty', true)
    })

    it('sets empty if auth not provided', () => {
      action = { type: actionTypes.LOGIN }
      expect(firebaseReducer({}, action)).to.have.deep.property(
        'auth.isEmpty',
        true
      )
    })
  })

  describe('REMOVE action -', () => {
    it('removes property from state', () => {
      const path = 'level0'
      action = { type: actionTypes.REMOVE, path }
      const afterState = firebaseReducer(
        { ...initialState, data: testData },
        action
      )
      expect(afterState).to.not.have.deep.property('data.level0')
    })
    it('removes parent properties from state if parent property is empty', () => {
      const path = 'level0/level1_item0/level2_item0/level3_item0'
      action = { type: actionTypes.REMOVE, path }
      const afterState = firebaseReducer(
        { ...initialState, data: testData },
        action
      )
      expect(afterState).to.not.have.deep.property(
        'data.level0.level1_item0.level2_item0'
      )
    })
    it('does not remove parent property from state if parent has other children', () => {
      const path = 'level0/level1_item0'
      action = { type: actionTypes.REMOVE, path }
      const afterState = firebaseReducer(
        { ...initialState, data: testData },
        action
      )
      expect(afterState).to.have.deep.property('data.level0.level1_item1')
    })
    it('ordered state is untouched', () => {
      const path = 'level0/level1_item0/level2_item0/level3_item0'
      action = { type: actionTypes.REMOVE, path }
      const afterState = firebaseReducer(
        { ...initialState, data: testData, ordered: testData },
        action
      )
      expect(afterState.ordered).to.deep.equal(testData)
    })
  })

  describe('AUTH_EMPTY_CHANGE action -', () => {
    it('sets auth.isLoaded: true (matches v1 LOGOUT action)', () => {
      action = { type: actionTypes.AUTH_EMPTY_CHANGE }
      expect(firebaseReducer({}, action)).to.have.deep.property(
        'auth.isLoaded',
        true
      )
    })

    it('sets profile.isLoaded: true (matches v1 LOGOUT action)', () => {
      action = { type: actionTypes.AUTH_EMPTY_CHANGE }
      expect(firebaseReducer({}, action)).to.have.deep.property(
        'profile.isLoaded',
        true
      )
    })

    it('removes existing auth state', () => {
      const auth = { some: 'value', isLoaded: true, isEmpty: false }
      action = { type: actionTypes.AUTH_EMPTY_CHANGE }
      expect(firebaseReducer({ auth }, action)).to.not.have.deep.property(
        'auth.some'
      )
    })
  })

  describe('AUTH_LINK_SUCCESS action -', () => {
    describe('dispatched with payload -', () => {
      it('sets auth.isEmpty: false', () => {
        action = { type: actionTypes.AUTH_LINK_SUCCESS, payload: { uid } }
        expect(
          firebaseReducer({ auth: { isEmpty: true } }, action)
        ).to.have.deep.property('auth.isEmpty', false)
      })

      it('sets auth data', () => {
        action = { type: actionTypes.AUTH_LINK_SUCCESS, payload: { uid } }
        expect(firebaseReducer({}, action)).to.have.deep.property(
          'auth.uid',
          uid
        )
      })

      it('calls .toJSON() if it exists', () => {
        const toJSON = sinon.spy(() => ({ email: 'test' }))
        action = { type: actionTypes.AUTH_LINK_SUCCESS, payload: { toJSON } }
        expect(firebaseReducer({}, action)).to.have.deep.property(
          'auth.email',
          'test'
        )
        expect(toJSON).to.have.been.calledOnce
      })
    })

    describe('dispatched without payload -', () => {
      it('removes existing auth state', () => {
        const auth = { uid: 'value', isLoaded: true, isEmpty: false }
        action = { type: actionTypes.AUTH_LINK_SUCCESS }
        expect(firebaseReducer({ auth }, action)).to.not.have.deep.property(
          'auth.uid'
        )
      })

      it('sets auth.isEmpty: true', () => {
        action = { type: actionTypes.AUTH_LINK_SUCCESS }
        expect(
          firebaseReducer({ auth: { isEmpty: false } }, action)
        ).to.have.deep.property('auth.isEmpty', true)
      })
    })
  })

  describe('LOGIN_ERROR action -', () => {
    it('sets state', () => {
      const authError = { some: 'error' }
      expect(
        firebaseReducer({}, { type: actionTypes.LOGIN_ERROR, authError })
      ).to.deep.equal({
        ...initialState,
        auth: { isLoaded: true, isEmpty: true },
        profile: { isLoaded: false, isEmpty: true },
        errors: [authError],
        authError
      })
    })
  })

  describe('AUTHENTICATION_INIT_STARTED action', () => {
    it('sets isInitializing to true', () => {
      action = { type: actionTypes.AUTHENTICATION_INIT_STARTED }
      expect(firebaseReducer({}, action)).to.have.property(
        'isInitializing',
        true
      )
    })
  })

  describe('AUTHENTICATION_INIT_FINISHED action', () => {
    it('sets isInitializing to false', () => {
      action = { type: actionTypes.AUTHENTICATION_INIT_FINISHED }
      expect(firebaseReducer({}, action)).to.have.property(
        'isInitializing',
        false
      )
    })
  })

  describe('UNAUTHORIZED_ERROR action', () => {
    it('sets state', () => {
      const authError = { some: 'error' }
      action = { type: actionTypes.UNAUTHORIZED_ERROR, authError }
      expect(firebaseReducer({}, action)).to.deep.equal({
        ...initialState,
        errors: [authError],
        authError
      })
    })
  })

  describe('AUTH_UPDATE_SUCCESS action -', () => {
    describe('provided auth - ', () => {
      it('sets auth.isLoaded: true', () => {
        const authUpdate = { email: 'newEmail' }
        action = { type: actionTypes.AUTH_UPDATE_SUCCESS, auth: authUpdate }
        expect(firebaseReducer({}, action)).to.have.deep.property(
          'auth.isLoaded',
          true
        )
      })

      it('sets data to auth state', () => {
        const authUpdate = { email: 'newEmail' }
        action = { type: actionTypes.AUTH_UPDATE_SUCCESS, auth: authUpdate }
        expect(firebaseReducer({}, action)).to.have.deep.property(
          'auth.email',
          authUpdate.email
        )
      })

      it('calls .toJSON() if it exists', () => {
        const toJSON = sinon.spy(() => ({ email: 'test' }))
        action = { type: actionTypes.AUTH_UPDATE_SUCCESS, auth: { toJSON } }
        expect(firebaseReducer({}, action)).to.have.deep.property(
          'auth.email',
          'test'
        )
        expect(toJSON).to.have.been.calledOnce
      })
    })

    describe('provided no auth - ', () => {
      it('sets auth.isEmpty: true', () => {
        action = { type: actionTypes.AUTH_UPDATE_SUCCESS }
        expect(
          firebaseReducer({ auth: { isEmpty: false } }, action)
        ).to.have.deep.property('auth.isEmpty', true)
      })
    })
  })

  describe('SET_LISTENER action', () => {
    it('sets id to allIds in listeners state', () => {
      action = {
        type: actionTypes.SET_LISTENER,
        path: 'test',
        payload: { id: 'asdf' }
      }
      expect(firebaseReducer({}, action)).to.have.deep.property(
        'listeners.allIds.0',
        'asdf'
      )
    })

    it('sets listener data to byId in listeners state', () => {
      const path = 'test'
      const id = 'asdf'
      action = { type: actionTypes.SET_LISTENER, path, payload: { id } }
      expect(firebaseReducer({}, action)).to.have.deep.property(
        `listeners.byId.${id}.path`,
        path
      )
    })
  })

  describe('CLEAR_ERRORS action', () => {
    it('clears errors', () => {
      action = { type: actionTypes.CLEAR_ERRORS }
      expect(
        firebaseReducer({ errors: [{ test: 'test' }] }, action).errors
      ).to.have.a.lengthOf(0)
    })

    describe('preserve option', () => {
      it('passes through non object preserve parameters (backwards compatibility)', () => {
        action = { type: actionTypes.CLEAR_ERRORS, preserve: [] }
        expect(
          firebaseReducer({ errors: [{ test: 'test' }] }, action).errors
        ).to.have.a.lengthOf(0)
      })

      it('supports perserving data through the perserve parameter', () => {
        action = {
          type: actionTypes.CLEAR_ERRORS,
          preserve: { errors: () => true }
        }
        expect(
          firebaseReducer({ errors: [{ test: 'test' }] }, action).errors
        ).to.have.a.lengthOf(1)
      })

      it('throws for non function preserve values', () => {
        action = { type: actionTypes.CLEAR_ERRORS, preserve: { errors: true } }
        expect(() =>
          firebaseReducer({ errors: [{ test: 'test' }] }, action)
        ).to.Throw(
          'Preserve for the errors state currently only supports functions'
        )
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
      action = {
        type: actionTypes.UNSET_LISTENER,
        path,
        payload: { id: 'asdf' }
      }
      expect(firebaseReducer(initialData, action).listeners).to.deep.equal({
        allIds: [],
        byId: {}
      })
    })

    it('removes id from byId in listeners state', () => {
      const path = 'test'
      const id = 'asdf'
      action = { type: actionTypes.UNSET_LISTENER, path, payload: { id } }
      initialData = {
        listeners: { byId: { [id]: { id, path } } }
      }
      expect(firebaseReducer(initialData, action).listeners).to.deep.equal({
        allIds: [],
        byId: {}
      })
    })
  })
})
