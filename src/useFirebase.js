import { useContext } from 'react'
import ReactReduxFirebaseContext from './ReactReduxFirebaseContext'

/**
 * @name createUseFirebase
 * @description Function that creates a Higher Order Component that
 * which provides `firebase` and `dispatch` as a props to React Components.
 *
 * **WARNING!!** This is an advanced feature, and should only be used when
 * needing to access a firebase instance created under a different store key.
 * @param {String} [storeKey='store'] - Name of redux store which contains
 * Firebase state (`state.firebase`)
 * @return {Function} - Higher Order Component which accepts an array of
 * watchers config and wraps a React Component
 * @example <caption>Basic</caption>
 * // props.firebase set on App component as firebase object with helpers
 * import { createWithFirebase } from 'react-redux-firebase'
 *
 * // create withFirebase that uses another redux store
 * const withFirebase = createWithFirebase('anotherStore')
 *
 * // use the withFirebase to wrap a component
 * export default withFirebase(SomeComponent)
 */
export const createUseFirebase = () => () => {
  return useContext(ReactReduxFirebaseContext)
}

/**
 * @name useFirebase
 * @description React hook that provides `firebase` object.
 * Firebase is gathered from `store.firebase`, which is attached to store
 * by the store enhancer (`reactReduxFirebase`) during setup.
 * **NOTE**: This version of the Firebase library has extra methods, config,
 * and functionality which give it it's capabilities such as dispatching
 * actions.
 * @return {Object} - Firebase object
 * @example <caption>Basic</caption>
 * import { useFirebase } from 'react-redux-firebase'
 *
 * function AddData() {
 *   const firebase = useFirebase()
 *   const push = firebase.push
 *   return (
 *     <div>
 *       <button onClick={() => push('todos', { done: false, text: 'Sample' })}>
 *         Add Sample Todo
 *       </button>
 *     </div>
 *   )
 * }
 */
export default createUseFirebase()
