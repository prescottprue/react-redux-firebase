import { isEqual } from 'lodash'
import { useRef, useMemo, useEffect } from 'react'
import { invokeArrayQuery, getChanges } from './utils'
import useFirestore from './useFirestore'

/**
 * @name createUseFirestoreConnect
 * @description React hook that automatically listens/unListens to provided
 * firestore paths.
 * **WARNING!!** This is an advanced feature, and should only be used when
 * needing to access a firebase instance created under a different store key.
 * Firestore state (state.firestore)
 * @return {Function} - React hook that accepts watch query
 * @example <caption>Basic</caption>
 * // props.firestore set on App component as firestore object with helpers
 * import { createUseFirestoreConnect } from 'react-redux-firebase'
 *
 * const firestoreConnect = createUseFirestoreConnect()
 *
 * export default useFirestoreConnect()
 */
export const createUseFirestoreConnect = () => dataOrFn => {
  const firestore = useFirestore()
  const firestoreIsEnabled = !!firestore
  const queryRef = useRef()

  const data = useMemo(() => invokeArrayQuery(dataOrFn), [dataOrFn])

  useEffect(
    () => {
      if (firestoreIsEnabled && !isEqual(data, queryRef.current)) {
        const changes = getChanges(data, queryRef.current)

        queryRef.current = data

        // Remove listeners for inactive subscriptions
        firestore.unsetListeners(changes.removed)

        // Add listeners for new subscriptions
        firestore.setListeners(changes.added)
      }
    },
    [data]
  )

  // Emulate componentWillUnmount
  useEffect(() => {
    return () => {
      if (firestoreIsEnabled && queryRef.current) {
        firestore.unsetListeners(queryRef.current)
      }
    }
  }, [])
}

/**
 * @name useFirestoreConnect
 * @description React hook that automatically listens/unListens
 * to provided Cloud Firestore paths. Make sure you have required/imported
 * Cloud Firestore, including it's reducer, before attempting to use.
 * **Note** Populate is not yet supported.
 * @param {Object|String|Array|Function} queriesConfig - An object, string,
 * or array of object or string for paths to sync from firestore. Can also be
 * a function that returns the object, string, or array of object or string.
 * @example <caption>Basic</caption>
 * import React from 'react'
 * import { map } from 'lodash'
 * import { connect } from 'react-redux'
 * import { useFirebaseConnect } from 'react-redux-firebase'
 *
 * function TodosList({ todosList }) {
 *   useFirebaseConnect('todos') // sync todos collection from Firestore into redux
 *
 *   return <ul>{_.map(todosList, todo => <li>{todo}</li>)}</ul>
 * }
 *
 * // pass todos list from redux as props.todosList
 * export default compose(
 *   connect((state) => ({
 *     todosList: state.firestore.data.todos
 *   })
 * )(TodosList)
 * @example <caption>Object as query</caption>
 * import React, { useMemo } from 'react'
 * import { get } from 'lodash'
 * import { connect } from 'react-redux'
 * import { useFirebaseConnect } from 'react-redux-firebase'
 *
 * function TodoItem({ todoId, todoData }) {
 *   useFirebaseConnect(() => ({
 *     collection: 'todos',
 *     doc: todoId
 *   }), [todoId]) // include dependency in the hook
 *
 *   return <div>{JSON.stringify(todoData)}</div>
 * }
 *
 * // pass todo data from redux as props.todosList
 * export default compose(
 *   connect((state) => ({
 *     todoData: get(state, ['firestore', 'data', 'todos', todoId])
 *   })
 * )(TodoItem)
 */
export default createUseFirestoreConnect()
