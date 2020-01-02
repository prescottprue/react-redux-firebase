import { useContext } from 'react'
import ReduxFirestoreContext from './ReduxFirestoreContext'

/**
 * @name useFirestore
 * @description React hook that return firestore object.
 * @returns {object} - Extended Firestore instance
 * @see https://react-redux-firebase.com/docs/api/useFirestore.html
 * @example <caption>Basic</caption>
 * import React from 'react'
 * import { useFirestore } from 'react-redux-firebase'
 *
 * export default function AddData({ firebase: { add } }) {
 *   const firestore = useFirestore()
 *
 *   function addTodo() {
 *     const exampleTodo = { done: false, text: 'Sample' }
 *     return firestore.collection('todos').add(exampleTodo)
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
export default function useFirestore() {
  return useContext(ReduxFirestoreContext)
}
