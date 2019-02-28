import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'
import { keys, values } from 'lodash'
import {
  storeWithFirebase,
  Container,
  ProviderMock,
  TestContainer,
  firebaseWithConfig
} from '../utils'
import firebaseConnect, {
  createFirebaseConnect
} from '../../src/firebaseConnect'
import ReactReduxFirebaseProvider from '../../src/ReactReduxFirebaseProvider'
import { createFirestoreInstance } from 'redux-firestore'
const dispatchSpy = sinon.spy()
const DYNAMIC_PROPS_SEPARATOR = ','

const getFirebaseWatchers = store => {
  return { ...store.firebase._.watchers }
}

const createContainer = (additionalWrappedProps, listeners) => {
  const store = storeWithFirebase()
  const WrappedContainer = firebaseConnect(props => {
    const itemsToSubscribe =
      props.dynamicProp &&
      props.dynamicProp
        .split(DYNAMIC_PROPS_SEPARATOR)
        .map(item => `test/${item}`)
    return itemsToSubscribe ? [...itemsToSubscribe] : []
  })(Container)

  const tree = TestUtils.renderIntoDocument(
    <ProviderMock store={store}>
      <ReactReduxFirebaseProvider
        dispatch={dispatchSpy}
        firebase={firebaseWithConfig()}
        createFirestoreInstance={createFirestoreInstance}
        config={{}}>
        <WrappedContainer pass="through" {...additionalWrappedProps} />
      </ReactReduxFirebaseProvider>
    </ProviderMock>
  )
  return {
    wrapped: TestUtils.findRenderedComponentWithType(tree, Container),
    parent: TestUtils.findRenderedComponentWithType(tree, ProviderMock),
    store
  }
}

describe('firebaseConnect', () => {
  it('passes firebase prop to child', () => {
    const { wrapped } = createContainer()
    expect(wrapped.props).to.have.a.property('firebase')
  })

  it('passes dispatch prop to child', () => {
    const { wrapped } = createContainer()
    expect(wrapped.props).to.have.a.property('dispatch')
  })

  it('passes through existing props', () => {
    const { wrapped } = createContainer()
    expect(wrapped.props).to.have.a.property('pass', 'through')
  })

  it('throws an exception if passed a prop that clashes with a reserved param', () => {
    let exceptions = []

    try {
      createContainer({
        firebase: '__SECRET_INTERNALS',
        dispatch: '__SECRET_INTERNALS'
      })
    } catch (e) {
      exceptions.push(e)
    }

    expect(exceptions.length).to.equal(1)
  })

  it.skip('disables watchers on unmount', () => {
    const { container, store } = createContainer()
    ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(container).parentNode)
    expect(container.context.store).to.equal(store)
  })

  it.skip('does not change watchers props changes that do not change listener paths', () => {
    const { parent, store } = createContainer()
    const watchers = getFirebaseWatchers(store)
    parent.setState({ test: 'somethingElse' })
    expect(getFirebaseWatchers(store)).to.eql(watchers)
  })

  it.skip('reapplies watchers when props change', () => {
    const { parent, store } = createContainer()
    const watchers = getFirebaseWatchers(store)
    parent.setState({
      dynamic: 'somethingElse'
    })
    expect(getFirebaseWatchers(store)).to.not.eql(watchers)
  })

  it.skip('applies new watchers when props change', () => {
    const { parent, wrapped } = createContainer()
    parent.setState({
      dynamic: 'somethingElse'
    })

    parent.setState({
      dynamic: 'somethingElse, anotherSomethingElse'
    })

    expect(keys(wrapped.props.firebase._.watchers).length).to.equal(2)
  })

  it.skip('correctly maintains watcher count when props change with extra listener paths', () => {
    const { parent, store } = createContainer()
    parent.setState({
      dynamic: 'somethingElse'
    })

    parent.setState({
      dynamic: 'somethingElse, anotherSomethingElse'
    })

    expect(values(getFirebaseWatchers(store))).to.eql([1, 1])
  })

  it.skip('correctly maintains watcher count when props change with removed listener paths', () => {
    const { parent, store } = createContainer()
    parent.setState({
      dynamic: 'somethingElse, anotherSomethingElse'
    })

    parent.setState({
      dynamic: 'somethingElse'
    })

    expect(values(getFirebaseWatchers(store))).to.eql([1])
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
    const containerPrime = firebaseConnect()(Container)
    expect(containerPrime.wrappedComponent).to.equal(Container)
  })
})

describe('createFirebaseConnect', () => {
  it('accepts a different store key', () => {
    createFirebaseConnect('store2')
  })
})
