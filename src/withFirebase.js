import React from 'react'
import hoistStatics from 'hoist-non-react-statics'
import { wrapDisplayName } from './utils'
import ReactReduxFirebaseContext from './ReactReduxFirebaseContext'

/**
 * @augments React.Component
 * @description Higher Order Component that provides `firebase` and
 * `dispatch` as a props to React Components.
 * **NOTE**: This version of the Firebase library has extra methods, config,
 * and functionality which give it it's capabilities such as dispatching
 * actions.
 * @param {React.Component} WrappedComponent - React component to wrap
 * @returns {Function} - Which accepts a component to wrap and returns the
 * wrapped component
 * @see http://react-redux-firebase.com/docs/api/withFirebase.html
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
export default function withFirebase(WrappedComponent) {
  /**
   * WithFirebase wrapper component
   * @param {object} props - Component props
   * @returns {React.Component} WrappedComponent wrapped with firebase context
   */
  function WithFirebase(props) {
    return (
      <ReactReduxFirebaseContext.Consumer>
        {firebase => (
          <WrappedComponent
            firebase={firebase}
            dispatch={firebase && firebase.dispatch}
            {...props}
          />
        )}
      </ReactReduxFirebaseContext.Consumer>
    )
  }

  WithFirebase.displayName = wrapDisplayName(WrappedComponent, 'withFirebase')
  WithFirebase.wrappedComponent = WrappedComponent

  return hoistStatics(WithFirebase, WrappedComponent)
}
