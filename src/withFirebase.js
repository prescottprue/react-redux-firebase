import React from 'react'
import PropTypes from 'prop-types'
import hoistStatics from 'hoist-non-react-statics'
import { getDisplayName } from './utils'

/**
 * @name createWithFirebase
 * @description Function that creates a Higher Order Component that
 * automatically listens/unListens to provided firebase paths using
 * React's Lifecycle hooks.
 * **WARNING!!** This is an advanced feature, and should only be used when
 * needing to access a firebase instance created under a different store key.
 * @param {String} [storeKey='store'] - Name of redux store which contains
 * Firebase state (state.firebase)
 * @return {Function} - HOC that accepts a watchArray and wraps a component
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
  const ChildComponent = (props, context) => {
    const { firebase, dispatch } = this.context[storeKey]
    return (
      <WrappedComponent
        {...props}
        dispatch={dispatch}
        firebase={{ ...firebase, ...firebase.helpers }}
      />
    )
  }

  ChildComponent.contextTypes = {
    [storeKey]: PropTypes.object.isRequired
  }
  ChildComponent.wrappedComponent = WrappedComponent
  ChildComponent.displayName = `withFirebase(${getDisplayName(WrappedComponent)})`

  return hoistStatics(ChildComponent, WrappedComponent)
}

/**
 * @name withFirebase
 * @extends React.Component
 * @description Higher Order Component that attaches firebase to props.
 * Firebase is gathered from store.firebase, which is attached to store by
 * the store enhancer (reactReduxFirebase) in ./enhancer.
 * @return {Function} - That accepts a component to wrap and returns the wrapped component
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
 */
export default createWithFirebase()
