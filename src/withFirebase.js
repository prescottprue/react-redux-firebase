import React from 'react'
import { get } from 'lodash'
import hoistStatics from 'hoist-non-react-statics'
import { wrapDisplayName } from './utils'
import useFirebase from './useFirebase'

/**
 * @name createWithFirebase
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
export const createWithFirebase = (storeKey = 'store') => WrappedComponent => {
  const WithFirebase = function WithFirebase(props) {
    const firebase = useFirebase()
    return (
      <WrappedComponent
        firebase={firebase}
        dispatch={get(firebase, 'dispatch')}
        {...props}
      />
    )
  }

  WithFirebase.displayName = wrapDisplayName(WrappedComponent, 'withFirebase')
  WithFirebase.wrappedComponent = WrappedComponent

  return hoistStatics(WithFirebase, WrappedComponent)
}

/**
 * @name withFirebase
 * @extends React.Component
 * @description Higher Order Component that provides `firebase` and
 * `dispatch` as a props to React Components. Firebase is gathered from
 * `store.firebase`, which is attached to store by the store enhancer
 * (`reactReduxFirebase`) during setup.
 * **NOTE**: This version of the Firebase library has extra methods, config,
 * and functionality which give it it's capabilities such as dispatching
 * actions.
 * @return {Function} - Which accepts a component to wrap and returns the
 * wrapped component
 * @example <caption>Basic</caption>
 * import React from 'react'
 * import { withFirebase } from 'react-redux-firebase'
 *
 * function AddTodo({ firebase: { push } }) {
 *   return (
 *     <div>
 *       <button onClick={() => push('todos', { done: false, text: 'Sample' })}>
 *         Add Sample Todo
 *       </button>
 *     </div>
 *   )
 * }
 *
 * export default withFirebase(AddTodo)
 * @example <caption>Within HOC Composition</caption>
 * import React from 'react'
 * import { compose } from 'redux' // can also come from recompose
 * import { withHandlers } from 'recompose'
 * import { withFirebase } from 'react-redux-firebase'
 *
 * function AddTodo({ addTodo }) {
 *   return (
 *     <div>
 *       <button onClick={addTodo}>
 *         Add Sample Todo
 *       </button>
 *     </div>
 *   )
 * }
 *
 * const enhance = compose(
 *   withFirebase,
 *   withHandlers({
 *     addTodo: props => () =>
 *        props.firestore.add(
 *          { collection: 'todos' },
 *          { done: false, text: 'Sample' }
 *        )
 *   })
 * )
 *
 * export default enhance(AddTodo)
 */
export default createWithFirebase()
