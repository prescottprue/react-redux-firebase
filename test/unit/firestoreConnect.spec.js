import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'
import {
  storeWithFirestore,
  Container,
  ProviderMock,
  TestContainer
} from '../utils'
import firestoreConnect, { createFirestoreConnect } from 'firestoreConnect'

const createContainer = () => {
  const store = storeWithFirestore()
  const WrappedContainer = firestoreConnect(props => [
    props.dynamicProp ? `test/${props.dynamicProp}` : 'test'
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

describe('firestoreConnect', () => {
  it.skip('should render if Firestore does not exist', () => {
    const { container } = createContainer()
    // TODO: Pass a fake store through context
    expect(container).to.exist
  })

  it.skip('disables watchers on unmount', () => {
    const { container, store } = createContainer()
    ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(container).parentNode)
    expect(container.context.store).to.equal(store)
  })

  it.skip('does not change watchers with props changes that do not change listener paths', () => {
    const { parent, container } = createContainer()
    const data = container.prevData
    parent.setState({ test: 'somethingElse' })
    expect(container.prevData).to.equal(data)
  })

  it.skip('reapplies watchers when props change', () => {
    const { parent, container } = createContainer()
    const data = container.prevData
    parent.setState({ dynamic: 'somethingElse' })
    expect(container.prevData).to.have.property(0, 'test/somethingElse')
    expect(container.prevData).to.not.equal(data)
  })

  describe.skip('sets displayName static as ', () => {
    /* eslint-disable no-template-curly-in-string */
    describe('FirestoreConnect(${WrappedComponentName}) for', () => {
      /* eslint-enable no-template-curly-in-string */
      it('standard components', () => {
        const containerPrime = firestoreConnect()(TestContainer)
        expect(containerPrime.displayName).to.equal(
          `FirestoreConnect(TestContainer)`
        )
      })

      it('string components', () => {
        const str = 'Test'
        const stringComp = firestoreConnect()('Test')
        expect(stringComp.displayName).to.equal(`FirestoreConnect(${str})`)
      })
    })

    it('"Component" for all other types', () => {
      const stringComp = firestoreConnect()(<div />)
      expect(stringComp.displayName).to.equal('FirestoreConnect(Component)')
    })
  })

  it.skip('sets WrappedComponent static as component which was wrapped', () => {
    const containerPrime = firestoreConnect()(TestContainer)
    expect(containerPrime.wrappedComponent).to.equal(TestContainer)
  })
})

describe('createFirestoreConnect', () => {
  it('creates a function', () => {
    expect(createFirestoreConnect('store2')).to.be.a.function
  })
})
