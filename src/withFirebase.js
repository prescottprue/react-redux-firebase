import React, { Component } from 'react'
import PropTypes from 'prop-types'
import hoistStatics from 'hoist-non-react-statics'
import { wrapDisplayName } from './utils'
import { v3ErrorMessage } from './constants'

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
 * // this.props.firebase set on App component as firebase object with helpers
 * import { createWithFirebase } from 'react-redux-firebase'
 *
 * // create withFirebase that uses another redux store
 * const withFirebase = createWithFirebase('anotherStore')
 *
 * // use the withFirebase to wrap a component
 * export default withFirebase(SomeComponent)
 */
export const createWithFirebase = (storeKey = 'store') => WrappedComponent => {
  class withFirebase extends Component {
    static wrappedComponent = WrappedComponent
    static displayName = wrapDisplayName(WrappedComponent, 'withFirebase')
    static contextTypes = {
      [storeKey]: PropTypes.object.isRequired
    }

    store = this.context[storeKey]

    render() {
      // Throw if using with react-redux@^6
      if (!this.context || !this.context[storeKey]) {
        // Use react-redux-firebase@^3 for react-redux@^6 support. More info available in the migration guide: http://bit.ly/2SRNdiO'
        throw new Error(v3ErrorMessage)
      }
      return (
        <WrappedComponent
          {...this.props}
          {...this.state}
          dispatch={this.store.dispatch}
          firebase={this.store.firebase}
        />
      )
    }
  }

  return hoistStatics(withFirebase, WrappedComponent)
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
 * import { withFirebase } from 'react-redux-firebase'
 *
 * const AddData = ({ firebase: { push } }) =>
 *   <div>
 *     <button onClick={() => push('todos', { done: false, text: 'Sample' })}>
 *       Add Sample Todo
 *     </button>
 *   </div>
 *
 * export default withFirebase(AddData)
 * @example <caption>Within HOC Composition</caption>
 * import { compose } from 'redux' // can also come from recompose
 * import { withHandlers } from 'recompose'
 * import { withFirebase } from 'react-redux-firebase'
 *
 * const AddTodo = ({ addTodo }) =>
 *   <div>
 *     <button onClick={addTodo}>
 *       Add Sample Todo
 *     </button>
 *   </div>
 *
 * export default compose(
 *   withFirebase(AddTodo),
 *   withHandlers({
 *     addTodo: props => () =>
 *        props.firestore.add(
 *          { collection: 'todos' },
 *          { done: false, text: 'Sample' }
 *        )
 *   })
 * )
 */
export default createWithFirebase()
