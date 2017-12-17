import React, { Children, Component, cloneElement } from 'react'
import PropTypes from 'prop-types'
import { createSink } from 'recompose'
import { createStore, compose, combineReducers } from 'redux'
import { reduxFirestore } from 'redux-firestore'
import reactReduxFirebase from '../src/enhancer'

export const storeWithFirebase = () => {
  const createStoreWithMiddleware = compose(
    reactReduxFirebase(Firebase, { userProfile: 'users' })
  )(createStore)
  return createStoreWithMiddleware(combineReducers({ test: (state = {}) => state }))
}

export const storeWithFirestore = () => {
  const createStoreWithMiddleware = compose(
    reactReduxFirebase(Firebase, { userProfile: 'users' }),
    reduxFirestore(Firebase) // mock for reduxFirestore from redux-firestore
  )(createStore)
  return createStoreWithMiddleware(combineReducers({ test: (state = {}) => state }))
}

export const TestContainer = () => createSink()
export const Container = () => <div />

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
