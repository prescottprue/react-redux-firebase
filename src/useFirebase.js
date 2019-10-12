import { useContext } from 'react'
import ReactReduxFirebaseContext from './ReactReduxFirebaseContext'

/**
 * @name useFirebase
 * React hook that provides `firebase` object.
 * Firebase is gathered from `store.firebase`, which is attached to store
 * by the store enhancer (`reactReduxFirebase`) during setup.
 * **NOTE**: This version of the Firebase library has extra methods, config,
 * and functionality which give it it's capabilities such as dispatching
 * actions.
 * @returns {object} - Extended Firebase instance
 * @see https://react-redux-firebase.com/api/useFirebase.html
 * @example <caption>Basic</caption>
 * import { useFirebase } from 'react-redux-firebase'
 *
 * function AddData() {
 *   const firebase = useFirebase()
 *
 *   function addTodo() {
 *     const exampleTodo = { done: false, text: 'Sample' }
 *     return firebase.push('todos', exampleTodo)
 *   }
 *
 *   return (
 *     <div>
 *       <button onClick={addTodo}>
 *         Add Sample Todo
 *       </button>
 *     </div>
 *   )
 * }
 */
export default function useFirebase() {
  return useContext(ReactReduxFirebaseContext)
}
