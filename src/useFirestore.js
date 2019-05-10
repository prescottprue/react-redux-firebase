import { useContext } from 'react'
import ReduxFirestoreContext from './ReduxFirestoreContext'

/**
 * @name createUseFirestore
 * @description Function that creates a hook that which provides
 * `firestore` object.
 *
 * **WARNING!!** This is an advanced feature, and should only be used when
 * needing to access a firebase instance created under a different store key.
 * @param {String} [storeKey='store'] - Name of redux store which contains
 * Firestore state (`state.firestore`)
 * @return {Function} - Higher Order Component which accepts an array of
 * watchers config and wraps a React Component
 * @example <caption>Basic</caption>
 * import { createUseFirestore } from 'react-redux-firebase'
 *
 * // create useFirestore that uses another redux store
 * const useFirestore = createUseFirestore()
 *
 * // use the useFirestore to wrap a component
 * export default useFirestore(SomeComponent)
 */
export const createUseFirestore = () => () => {
  return useContext(ReduxFirestoreContext)
}

/**
 * @name useFirestore
 * @extends React.Component
 * @description React hook that return firestore object.
 * Firestore instance is gathered from `store.firestore`, which is attached
 * to store by the store enhancer (`reduxFirestore`) during setup of
 * [`redux-firestore`](https://github.com/prescottprue/redux-firestore)
 * @return {Function} - Firestore instance
 * @example <caption>Basic</caption>
 * import React from 'react'
 * import { useFirestore } from 'react-redux-firebase'
 *
 * function AddData({ firebase: { add } }) {
 *   const firestore = useFirestore()
 *   const add = todo => {
 *     firestore.collection('todos').add(todo)
 *   }
 *   return (
 *     <div>
 *       <button onClick={() => add({ done: false, text: 'Sample' })}>
 *         Add Sample Todo
 *       </button>
 *     </div>
 *   )
 * }
 *
 * export default AddTodo
 */
export default createUseFirestore()
