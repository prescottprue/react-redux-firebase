import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'
import { createSink } from 'recompose'
import {
  storeWithFirebase,
  Container,
  ProviderMock,
  TestContainer
} from '../utils'
import firebaseConnect, {
  createFirebaseConnect
} from '../../src/firebaseConnect'

const createContainer = () => {
  const store = storeWithFirebase()
  const WrappedContainer = firebaseConnect(props => [
    `test/${props.dynamicProp}`
  ])(Container)

  const tree = TestUtils.renderIntoDocument(
    <ProviderMock store={store}>
      <WrappedContainer pass="through" />
    </ProviderMock>
  )

  return {
    container: TestUtils.findRenderedComponentWithType(tree, WrappedContainer),
    parent: TestUtils.findRenderedComponentWithType(tree, ProviderMock),
    store
  }
}

describe('firebaseConnect', () => {
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
    /* eslint-disable no-template-curly-in-string */
    describe('FirebaseConnect(${WrappedComponentName}) for', () => {
      /* eslint-enable no-template-curly-in-string */
      it('class components', () => {
        const containerPrime = firebaseConnect()(TestContainer)
        expect(containerPrime.displayName).to.equal(
          `FirebaseConnect(TestContainer)`
        )
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
    const component = createSink()
    const containerPrime = firebaseConnect()(component)
    expect(containerPrime.wrappedComponent).to.equal(component)
  })
})

describe('createFirebaseConnect', () => {
  it('accepts a different store key', () => {
    createFirebaseConnect('store2')
  })
})
