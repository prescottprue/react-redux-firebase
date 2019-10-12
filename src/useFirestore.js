import { useContext } from 'react'
import ReduxFirestoreContext from './ReduxFirestoreContext'

/**
 * @name useFirestore
 * React hook that return firestore object.
 * Firestore instance is gathered from `store.firestore`, which is attached
 * to store by the store enhancer (`reduxFirestore`) during setup of
 * [`redux-firestore`](https://github.com/prescottprue/redux-firestore)
 * @returns {object} - Extended Firestore instance
 * @see http://docs.react-redux-firebase.com/history/v3.0.0/docs/api/useFirestore.html
 * @example <caption>Basic</caption>
 * import React from 'react'
 * import { useFirestore } from 'react-redux-firebase'
 *
 * function AddData({ firebase: { add } }) {
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
 *
 * export default AddTodo
 */
export default function useFirestore() {
  return useContext(ReduxFirestoreContext)
}
