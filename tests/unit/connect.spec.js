import React, { Children, Component, cloneElement } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import firebaseConnect from '../../src/firebaseConnect'
import reactReduxFirebase from '../../src/compose'
import { createStore, compose, combineReducers } from 'redux'

describe('firebaseConnect', () => {
  class Passthrough extends Component {
    render () {
      return <div>{JSON.stringify(this.props)}</div>
    }
  }

  class ProviderMock extends Component {
    getChildContext () {
      return { store: this.props.store }
    }

    state = { test: null, dynamic: '' }

    render () {
      return Children.only(
        cloneElement(this.props.children,
          { testProp: this.state.test, dynamicProp: this.state.dynamic }
        ))
    }
  }

  ProviderMock.childContextTypes = {
    store: PropTypes.object.isRequired
  }

  ProviderMock.propTypes = {
    children: PropTypes.node,
    store: PropTypes.object.isRequired
  }

  const createContainer = () => {
    const createStoreWithMiddleware = compose(
      reactReduxFirebase(Firebase, { userProfile: 'users' }),
      typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
    )(createStore)
    const store = createStoreWithMiddleware(combineReducers({ test: (state = {}) => state }))

    @firebaseConnect((props) => [
      `test/${props.dynamicProp}`
    ])
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

    return {
      container: TestUtils.findRenderedComponentWithType(tree, Container),
      parent: TestUtils.findRenderedComponentWithType(tree, ProviderMock),
      store
    }
  }

  it('should receive the store in the context', () => {
    const { container, store } = createContainer()
    expect(container.context.store).to.equal(store)
  })

  it('disables watchers on unmount', () => {
    const { container, store } = createContainer()
    ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(container).parentNode)
    expect(container.context.store).to.equal(store)
  })

  it('does not change watchers props changes that do not change listener paths', () => {
    const { parent } = createContainer()
    parent.setState({ test: 'somethingElse' })
    // expect(parent.context.store).to.equal(store)
  })

  it('reapplies watchers when props change', () => {
    const { parent } = createContainer()
    parent.setState({
      dynamic: 'somethingElse'
    })
    // expect(parent.context.store).to.equal(store)
  })

  describe('sets displayName static as ', () => {
    describe('FirebaseConnect(${WrappedComponentName}) for', () => { // eslint-disable-line no-template-curly-in-string
      it('standard components', () => {
        class TestContainer extends Component {
          render () {
            return <Passthrough {...this.props} />
          }
        }

        const containerPrime = firebaseConnect()(TestContainer)
        expect(containerPrime.displayName).to.equal(`FirebaseConnect(TestContainer)`)
      })

      it('string components', () => {
        const str = 'Test'
        const stringComp = firebaseConnect()('Test')
        expect(stringComp.displayName).to.equal(`FirebaseConnect(${str})`)
      })
    })

    it('"Component" for all other types', () => {
      const stringComp = firebaseConnect()(<div />)
      expect(stringComp.displayName).to.equal('FirebaseConnect(Component)')
    })
  })

  it('sets WrappedComponent static as component which was wrapped', () => {
    class Container extends Component {
      render () {
        return <Passthrough {...this.props} />
      }
    }

    const containerPrime = firebaseConnect()(Container)
    expect(containerPrime.wrappedComponent).to.equal(Container)
  })
})
