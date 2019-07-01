import React, { Component } from 'react'
import PropTypes from 'prop-types'
import hoistStatics from 'hoist-non-react-statics'
import { wrapDisplayName } from './utils'
import { v3ErrorMessage } from './constants'

/**
 * @name createWithFirestore
 * @description Function that creates a Higher Order Component that
 * which provides `firebase`, `firestore`, and `dispatch` to React Components.
 *
 * **WARNING!!** This is an advanced feature, and should only be used when
 * needing to access a firebase instance created under a different store key.
 * @param {String} [storeKey='store'] - Name of redux store which contains
 * Firestore state (`state.firestore`)
 * @return {Function} - Higher Order Component which accepts an array of
 * watchers config and wraps a React Component
 * @example <caption>Basic</caption>
 * import { createWithFirestore } from 'react-redux-firebase'
 *
 * // create withFirestore that uses another redux store
 * const withFirestore = createWithFirestore('anotherStore')
 *
 * // use the withFirestore to wrap a component
 * export default withFirestore(SomeComponent)
 */
export const createWithFirestore = (storeKey = 'store') => WrappedComponent => {
  class withFirestore extends Component {
    static wrappedComponent = WrappedComponent
    static displayName = wrapDisplayName(WrappedComponent, 'withFirestore')
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
          dispatch={this.store.dispatch}
          firestore={this.store.firestore}
          firebase={this.store.firebase}
        />
      )
    }
  }

  return hoistStatics(withFirestore, WrappedComponent)
}

/**
 * @name withFirestore
 * @extends React.Component
 * @description Higher Order Component that attaches `firestore`, `firebase`
 * and `dispatch` as props to React Components. Firebase instance is gathered
 * from `store.firestore`, which is attached to store by the store enhancer
 * (`reduxFirestore`) during setup of
 * [`redux-firestore`](https://github.com/prescottprue/redux-firestore)
 * @return {Function} - Which accepts a component to wrap and returns the
 * wrapped component
 * @example <caption>Basic</caption>
 * import React from 'react'
 * import { withFirestore } from 'react-redux-firebase'
 *
 * function AddTodo({ firestore: { add } }) {
 *   return (
 *     <div>
 *       <button onClick={() => add('todos', { done: false, text: 'Sample' })}>
 *         Add Sample Todo
 *       </button>
 *     </div>
 *   )
 * }
 *
 * export default withFirestore(AddTodo)
 * @example <caption>Within HOC Composition</caption>
 * import React from 'react'
 * import { compose } from 'redux' // can also come from recompose
 * import { withHandlers } from 'recompose'
 * import { withFirestore } from 'react-redux-firebase'
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
 *   withFirestore,
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
export default createWithFirestore()
