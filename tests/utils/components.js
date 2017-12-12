import React, { Children, Component, cloneElement } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import { createSink } from 'recompose'
import { createStore, compose, combineReducers } from 'redux'
import reactReduxFirebase from '../../src/enhancer'
import { reduxFirestore } from 'redux-firestore'

export class Passthrough extends Component {
  render () {
    return <div></div>
  }
}

export class ProviderMock extends Component {
  getChildContext () {
    return { store: this.props.store }
  }

  state = { test: null, dynamic: '' }

  render () {
    return Children.only(
      cloneElement(this.props.children, {
        testProp: this.state.test,
        dynamicProp: this.state.dynamic
      }))
  }
}

ProviderMock.childContextTypes = {
  store: PropTypes.object.isRequired
}

ProviderMock.propTypes = {
  store: PropTypes.object,
  children: PropTypes.node
}

export class TestContainer extends Component {
  render () {
    return <Passthrough {...this.props} />
  }
}

export const storeWithFirebase = () => {
  const createStoreWithMiddleware = compose(
    reactReduxFirebase(Firebase, { userProfile: 'users' })
  )(createStore)
  return createStoreWithMiddleware(combineReducers({ test: (state = {}) => state }))
}

export const storeWithFirestore = () => {
  const createStoreWithMiddleware = compose(
    reactReduxFirebase(Firebase, { userProfile: 'users' }),
    reduxFirestore(Firebase)
  )(createStore)
  return createStoreWithMiddleware(combineReducers({ test: (state = {}) => state }))
}
