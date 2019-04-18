import { isArray } from 'lodash'
import { useMemo, useEffect } from 'react'
import { createCallable } from './utils'
import useFirestore from './useFirestore'

/**
 * @name createUseFirestoreConnect
 * @description React hook that automatically listens/unListens to provided
 * firebase paths.
 * **WARNING!!** This is an advanced feature, and should only be used when
 * needing to access a firebase instance created under a different store key.
 * Firebase state (state.firebase)
 * @return {Function} - React hook that accepts watch query
 * @example <caption>Basic</caption>
 * // props.firebase set on App component as firebase object with helpers
 * import { createUseFirestoreConnect } from 'react-redux-firebase'
 *
 * const firestoreConnect = createUseFirestoreConnect()
 *
 * export default useFirestoreConnect()
 */
export const createUseFirestoreConnect = () => dataOrFn => {
  const firestore = useFirestore()

  const inputAsFunc = createCallable(dataOrFn)

  const data = inputAsFunc()

  const payload = useMemo(
    () => {
      if (!data) {
        return null
      }
      if (isArray(data)) {
        throw new Error("Array isn't allowed inside useFirestoreConnect hook.")
      }
      return [data]
    },
    [data]
  )

  useEffect(
    () => {
      if (data !== null) {
        firestore.setListeners(payload)
        return () => {
          firestore.unsetListeners(payload)
        }
      }
    },
    [data]
  )
}

/**
 * @name useFirestoreConnect
 * @description React hook that automatically listens/unListens
 * to provided Cloud Firestore paths. Make sure you have required/imported
 * Cloud Firestore, including it's reducer, before attempting to use.
 * **Note** Populate is not yet supported.
 * **Note2** Only single path is allowed per one hook
 * @param {Object|String} queriesConfig - An object or string for paths to sync
 * from firestore. Can also be a function that returns the object or string.
 * @example <caption>Basic</caption>
 * import React from 'react'
 * import { map } from 'lodash'
 * import { connect } from 'react-redux'
 * import { useFirebaseConnect } from 'react-redux-firebase'
 *
 * const TodosList = ({ todosList }) => {
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
 * const TodoItem = ({ todoId, todoData }) => {
 *   cosnt query = useMemo( // Make sure that everytime component rerender will not create a new query object which cause unnecessary set/unset listener
 *     () => ({
 *       collection: 'todos',
 *       doc: todoId
 *     }),
 *     [todoId] // useMemo's dependency
 *   )
 *   useFirebaseConnect(query) // sync todos collection from Firestore into redux
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
