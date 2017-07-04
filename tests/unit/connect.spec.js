import React, { Children, Component } from 'react'
import PropTypes from 'prop-types'
import TestUtils from 'react-addons-test-utils'
import { createStore, compose, combineReducers } from 'redux'
import connect from '../../src/connect'
import reactReduxFirebase from '../../src/compose'

describe('Connect', () => {
  class Passthrough extends Component {
    render () {
      return <div>{JSON.stringify(this.props)}</div>
    }
  }

  class ProviderMock extends Component {
    getChildContext () {
      return { store: this.props.store }
    }

    render () {
      return Children.only(this.props.children)
    }
  }

  ProviderMock.childContextTypes = {
    store: PropTypes.object.isRequired
  }

  ProviderMock.propTypes = {
    children: PropTypes.node,
    store: PropTypes.object.isRequired
  }

  it('should receive the store in the context', () => {
    const createStoreWithMiddleware = compose(
      reactReduxFirebase(Firebase, { userProfile: 'users' }),
      typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
    )(createStore)
    const store = createStoreWithMiddleware(combineReducers({ test: (state = {}) => state }))

    @connect()
    class Container extends Component {
      render () {
        return <Passthrough {...this.props} />
      }
    }

    const tree = TestUtils.renderIntoDocument(
      <ProviderMock store={store}>
        <Container pass='through' />
      </ProviderMock>
    )

    const container = TestUtils.findRenderedComponentWithType(tree, Container)
    container.setState({
      testState: 'somethingElse'
    })
    expect(container.context.store).to.equal(store)
  })
})
