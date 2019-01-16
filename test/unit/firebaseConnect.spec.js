import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'
import { createSink } from 'recompose'
import { keys, values } from 'lodash'

import {
  storeWithFirebase,
  Container,
  ProviderMock,
  TestContainer
} from '../utils'
import firebaseConnect, {
  createFirebaseConnect
} from '../../src/firebaseConnect'

const DYNAMIC_PROPS_SEPARATOR = ','

const getFirebaseWatchers = store => {
  return { ...store.firebase._.watchers }
}

const createContainer = additionalWrappedProps => {
  const store = storeWithFirebase()
  const WrappedContainer = firebaseConnect(props => {
    const itemsToSubscribe =
      props.dynamicProp &&
      props.dynamicProp
        .split(DYNAMIC_PROPS_SEPARATOR)
        .map(item => `test/${item}`)
    return [...itemsToSubscribe]
  })(Container)

  const tree = TestUtils.renderIntoDocument(
    <ProviderMock store={store}>
      <WrappedContainer pass="through" {...additionalWrappedProps} />
    </ProviderMock>
  )

  return {
    // container: TestUtils.findRenderedComponentWithType(tree, WrappedContainer),
    parent: TestUtils.findRenderedComponentWithType(tree, ProviderMock),
    store
  }
}

describe('firebaseConnect', () => {
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
    const { parent, store } = createContainer()
    parent.setState({
      dynamic: 'somethingElse'
    })

    parent.setState({
      dynamic: 'somethingElse, anotherSomethingElse'
    })

    expect(keys(getFirebaseWatchers(store)).length).to.equal(2)
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

  it('throws an exception if passed a prop that clashes with a reserved param', () => {
    let exceptions = []

    try {
      createContainer({
        _firebaseRef: '__SECRET_INTERNALS',
        _dispatch: '__SECRET_INTERNALS'
      })
    } catch (e) {
      exceptions.push(e)
    }

    expect(exceptions.length).to.equal(1)
  })

  describe.skip('sets displayName static as ', () => {
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

  it.skip('sets WrappedComponent static as component which was wrapped', () => {
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
