import React, { Component } from 'react'
import PropTypes from 'prop-types'
import hoistStatics from 'hoist-non-react-statics'
import { wrapDisplayName } from 'recompose'
/**
 * @name createWithFirestore
 * @description Function that creates a Higher Order Component that
 * which providers props.firestore and props.firebase to React Components.
 * **WARNING!!** This is an advanced feature, and should only be used when
 * needing to access a firebase instance created under a different store key.
 * @param {String} [storeKey='store'] - Name of redux store which contains
 * Firebase state (state.firebase)
 * @return {Function} - HOC that accepts a watchArray and wraps a component
 * @example <caption>Basic</caption>
 * // this.props.firebase set on App component as firebase object with helpers
 * import { createWithFirebase } from 'react-redux-firebase'
 *
 * // create withFirestore that uses another redux store
 * const withFirestore = createWithFirebase('anotherStore')
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

    render () {
      return (
        <WrappedComponent
          {...this.props}
          {...this.state}
          firestore={this.store.firestore}
          firebase={this.store.firebase}
          dispatch={this.store.dispatch}
        />
      )
    }
   }

  return hoistStatics(withFirestore, WrappedComponent)
}

/**
 * @name withFirestore
 * @extends React.Component
 * @description Higher Order Component that attaches props.firestore and
 * props.firebase to React Components.
 * Firebase is gathered from store.firebase, which is attached to store by
 * the store enhancer (reactReduxFirebase) in ./enhancer.
 * @return {Function} - That accepts a component to wrap and returns the wrapped component
 * @example <caption>Basic</caption>
 * import { withFirestore } from 'react-redux-firebase'
 *
 * const AddData = ({ firebase: { push } }) =>
 *   <div>
 *     <button onClick={() => push('todos', { done: false, text: 'Sample' })}>
 *       Add Sample Todo
 *     </button>
 *   </div>
 *
 * export default withFirestore(AddData)
 */
export default createWithFirestore()
