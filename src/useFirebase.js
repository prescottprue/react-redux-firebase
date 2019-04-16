import { useContext } from 'react'
import ReactReduxFirebaseContext from './ReactReduxFirebaseContext'

/**
 * @name createUseFirebase
 * @description Function that creates a react hook which provides `firebase` object.
 *
 * **WARNING!!** This is an advanced feature, and should only be used when
 * needing to access a firebase instance created under a different store key.
 * Firebase state (`state.firebase`)
 * @return {Function} - A hook fucntion that return firebase object. 
 * @example <caption>Basic</caption>
 * import { createUseFirebase } from 'react-redux-firebase'
 *
 * // create useFirebase
 * const useFirebase = createUseFirebase()
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
 * @return {Object} - Firebase instance
 * @example <caption>Basic</caption>
 * import { useFirebase } from 'react-redux-firebase'
 *
 * function AddData() {
 *   const firebase = useFirebase()
 *   return (
 *     <div>
 *       <button onClick={() => firebase.push('todos', { done: false, text: 'Sample' })}>
 *         Add Sample Todo
 *       </button>
 *     </div>
 *   )
 * }
 */
export default createUseFirebase()
