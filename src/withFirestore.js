import React, { Component } from 'react'
import hoistStatics from 'hoist-non-react-statics'
import { wrapDisplayName } from './utils'
import ReduxFirestoreContext from './ReduxFirestoreContext'

/**
 * @name createWithFirestore
 * @description Function that creates a Higher Order Component that
 * which provides `firebase`, `firestore`, and `dispatch` to React Components.
 *
 * **WARNING!!** This is an advanced feature, and should only be used when
 * needing to access a firebase instance created under a different store key.
 * @param {String} [storeKey='store'] - Name of redux store which contains
 * Firebase state (`state.firebase`)
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
  class WithFirestore extends Component {
    static wrappedComponent = WrappedComponent

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  const HoistedComp = hoistStatics(WithFirestore, WrappedComponent)

  const withFirestore = props => (
    <ReduxFirestoreContext.Consumer>
      {firestore => <HoistedComp firestore={firestore} {...props} />}
    </ReduxFirestoreContext.Consumer>
  )

  withFirestore.displayName = wrapDisplayName(WrappedComponent, 'withFirestore')
  withFirestore.wrappedComponent = WrappedComponent

  return withFirestore
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
 * import { withFirestore } from 'react-redux-firebase'
 *
 * const AddTodo = ({ firestore: { add } }) =>
 *   <div>
 *     <button onClick={() => add('todos', { done: false, text: 'Sample' })}>
 *       Add Sample Todo
 *     </button>
 *   </div>
 *
 * export default withFirestore(AddTodo)
 * @example <caption>Within HOC Composition</caption>
 * import { compose } from 'redux' // can also come from recompose
 * import { withHandlers } from 'recompose'
 * import { withFirestore } from 'react-redux-firebase'
 *
 * const AddTodo = ({ addTodo }) =>
 *   <div>
 *     <button onClick={addTodo}>
 *       Add Sample Todo
 *     </button>
 *   </div>
 *
 * export default compose(
 *   withFirestore(AddTodo),
 *   withHandlers({
 *     addTodo: props => () =>
 *        props.firestore.add(
 *          { collection: 'todos' },
 *          { done: false, text: 'Sample' }
 *        )
 *   })
 * )
 */
export default createWithFirestore()
