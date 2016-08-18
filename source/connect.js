import React, {PropTypes} from 'react'
import {watchEvents, unWatchEvents} from './actions'

const defaultEvent = {
  path: '',
  type: 'value'
}

const ensureCallable = maybeFn => //eslint-disable-line
  typeof maybeFn === 'function' ? maybeFn : () => maybeFn //eslint-disable-line

const flatMap = arr => (arr && arr.length) ? arr.reduce((a, b) => a.concat(b)) : []

const createEvents = ({type, path}) => {
  switch (type) {

    case 'value':
      return [{name: 'value', path}]

    case 'all':
      return [
        {name: 'first_child', path},
        {name: 'child_added', path},
        {name: 'child_removed', path},
        {name: 'child_moved', path},
        {name: 'child_changed', path}
      ]

    default:
      return []
  }
}

const transformEvent = event => Object.assign({}, defaultEvent, event)

const getEventsFromDefinition = def => flatMap(def.map(path => {
  if (typeof path === 'string' || path instanceof String) {
    return createEvents(transformEvent({ path }))
  }

  if (typeof path === 'array' || path instanceof Array) { // eslint-disable-line
    return createEvents(transformEvent({ type: 'all', path: path[0] }))
  }

  if (typeof path === 'object' || path instanceof Object) {
    const type = path.type || 'value'
    switch (type) {
      case 'value':
        return createEvents(transformEvent({ path: path.path }))

      case 'array':
        return createEvents(transformEvent({ type: 'all', path: path.path }))
    }
  }

  return []
}))

export default (dataOrFn = []) => WrappedComponent => {
  class FirebaseConnect extends React.Component {

    constructor (props, context) {
      super(props, context)
      this._firebaseEvents = []
      this.firebase = null
    }

    // static contextTypes = {
    //   store: PropTypes.object
    // };

    componentWillMount () {
      const {firebase, dispatch} = this.context.store

      const linkFn = ensureCallable(dataOrFn)
      const data = linkFn(this.props, firebase)

      const {ref, helpers} = firebase
      this.firebase = {ref, ...helpers}

      this._firebaseEvents = getEventsFromDefinition(data)
      watchEvents(firebase, dispatch, this._firebaseEvents)
    }

    componentWillUnmount () {
      const {firebase, dispatch} = this.context.store
      unWatchEvents(firebase, dispatch, this._firebaseEvents)
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
  FirebaseConnect.contextTypes = {
    store: PropTypes.object.isRequired
  }
  return FirebaseConnect
}
