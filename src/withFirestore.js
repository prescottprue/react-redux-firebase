import React from 'react'
import hoistStatics from 'hoist-non-react-statics'
import { wrapDisplayName } from './utils'
import ReactReduxFirebaseContext from './ReactReduxFirebaseContext'
import ReduxFirestoreContext from './ReduxFirestoreContext'

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
 *     addTodo: props => () => {
 *       const newTodo = { done: false, text: 'Sample' }
 *       return props.firestore.add({ collection: 'todos' }, newTodo)
 *     }
 *   })
 * )
 *
 * export default enhance(AddTodo)
 */
export default function withFirestore(WrappedComponent) {
  function WithFirestore(props) {
    return (
      <ReactReduxFirebaseContext.Consumer>
        {firebase => (
          <ReduxFirestoreContext.Consumer>
            {firestore => (
              <WrappedComponent
                firestore={firestore}
                firebase={firebase}
                dispatch={firebase.dispatch}
                {...props}
              />
            )}
          </ReduxFirestoreContext.Consumer>
        )}
      </ReactReduxFirebaseContext.Consumer>
    )
  }

  WithFirestore.displayName = wrapDisplayName(WrappedComponent, 'withFirestore')
  WithFirestore.wrappedComponent = WrappedComponent

  return hoistStatics(WithFirestore, WrappedComponent)
}
