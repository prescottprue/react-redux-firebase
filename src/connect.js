import React, { PropTypes, Component } from 'react'
import { isEqual } from 'lodash'
import { watchEvents, unWatchEvents } from './actions/query'
import { getEventsFromInput, createCallable } from './utils'

export default (dataOrFn = []) => WrappedComponent => {
  class FirebaseConnect extends Component {

    constructor (props, context) {
      super(props, context)
      this._firebaseEvents = []
      this.firebase = null
    }

    static contextTypes = {
      store: PropTypes.object.isRequired
    };

    componentWillMount () {
      const { firebase, dispatch } = this.context.store

      // Allow function to be passed
      const inputAsFunc = createCallable(dataOrFn)
      this.originalData = inputAsFunc(this.props, firebase)

      const { ref, helpers, storage, database, auth } = firebase
      this.firebase = { ref, storage, database, auth, ...helpers }

      this._firebaseEvents = getEventsFromInput(this.originalData)

      watchEvents(firebase, dispatch, this._firebaseEvents)
    }

    componentWillUnmount () {
      const { firebase } = this.context.store
      unWatchEvents(firebase, this._firebaseEvents)
    }

    componentWillReceiveProps (np) {
      const { firebase, dispatch } = this.context.store
      const inputAsFunc = createCallable(dataOrFn)
      const data = inputAsFunc(np, firebase)

      // Handle a data parameter having changed
      if (!isEqual(data, this.originalData)) {
        // UnWatch all current events
        unWatchEvents(firebase, this._firebaseEvents)
        // Get watch events from new data
        this._firebaseEvents = getEventsFromInput(data)
        // Watch new events
        watchEvents(firebase, dispatch, this._firebaseEvents)
      }
    }

    render () {
      return (
        <WrappedComponent
          {...this.props}
          {...this.state}
          firebase={this.firebase}
        />
      )
    }
  }

  return FirebaseConnect
}
