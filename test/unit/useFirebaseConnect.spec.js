import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'
import { some, keys, values, isMatch, filter } from 'lodash'
import { storeWithFirebase, firebaseWithConfig, sleep } from '../utils'
import useFirebaseConnect, {
  createUseFirebaseConnect
} from '../../src/useFirebaseConnect'
import ReactReduxFirebaseProvider from '../../src/ReactReduxFirebaseProvider'
import { createFirestoreInstance } from 'redux-firestore'

/* eslint-disable react/prop-types */
function TestComponent(props) {
  useFirebaseConnect(`test/${props.dynamicProps}`)
  return <div />
}
/* eslint-enable react/prop-types */

const createContainer = (additionalWrappedProps, listeners) => {
  const firebase = firebaseWithConfig()
  const store = storeWithFirebase()
  sinon.spy(store, 'dispatch')

  class Container extends Component {
    state = { test: 'testing', dynamic: 'start' }

    render() {
      return (
        <ReactReduxFirebaseProvider
          dispatch={store.dispatch}
          firebase={firebase}
          createFirestoreInstance={createFirestoreInstance}
          config={{}}>
          <TestComponent
            dynamicProps={this.state.dynamic}
            testProps={this.state.test}
            {...additionalWrappedProps}
          />
        </ReactReduxFirebaseProvider>
      )
    }
  }

  const tree = TestUtils.renderIntoDocument(<Container />)

  return {
    // component: TestUtils.findRenderedComponentWithType(tree, TestComponent),
    parent: TestUtils.findRenderedComponentWithType(tree, Container),
    dispatch: store.dispatch,
    firebase,
    store
  }
}

describe('useFirebaseConnect', () => {
  it('enebles watchers on mount', async () => {
    const { dispatch } = await createContainer()
    await sleep()
    expect(
      some(dispatch.args, arg =>
        isMatch(arg[0], {
          type: '@@reactReduxFirebase/SET_LISTENER',
          path: 'test/start'
        })
      )
    ).to.be.true
  })

  it('disables watchers on unmount', async () => {
    const { parent, dispatch } = await createContainer()
    await sleep()
    ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(parent).parentNode)
    await sleep()
    expect(
      some(dispatch.args, arg =>
        isMatch(arg[0], {
          type: '@@reactReduxFirebase/UNSET_LISTENER',
          path: 'test/start'
        })
      )
    ).to.be.true
  })

  it('does not change watchers props changes that do not change listener paths', async () => {
    const { parent, dispatch } = createContainer()
    // const watchers = getFirebaseWatchers(store)
    await sleep()
    parent.setState({ test: 'somethingElse' })
    await sleep()
    expect(
      filter(dispatch.args, arg =>
        isMatch(arg[0], {
          type: '@@reactReduxFirebase/SET_LISTENER',
          path: 'test/start'
        })
      )
    ).to.have.lengthOf(1)
  })

  it('reapplies watchers when props change', async () => {
    const { parent, dispatch } = createContainer()
    // const watchers = getFirebaseWatchers(store)
    await sleep()
    parent.setState({ dynamic: 'somethingElse' })
    await sleep()

    expect(
      filter(dispatch.args, arg =>
        isMatch(arg[0], {
          type: '@@reactReduxFirebase/UNSET_LISTENER',
          path: 'test/start'
        })
      )
    ).to.have.lengthOf(1)
    expect(
      filter(dispatch.args, arg =>
        isMatch(arg[0], {
          type: '@@reactReduxFirebase/SET_LISTENER',
          path: 'test/somethingElse'
        })
      )
    ).to.have.lengthOf(1)
  })

  it.skip('applies new watchers when props change', async () => {
    const { parent, firebase } = createContainer()
    await sleep()
    parent.setState({
      dynamic: 'somethingElse'
    })
    await sleep()
    parent.setState({
      dynamic: 'somethingElse,anotherSomethingElse'
    })
    await sleep()
    expect(keys(firebase._.watchers).length).to.equal(2)
  })

  it.skip('correctly maintains watcher count when props change with extra listener paths', async () => {
    const { parent, firebase } = createContainer()
    await sleep()

    parent.setState({
      dynamic: 'somethingElse'
    })
    await sleep()

    parent.setState({
      dynamic: 'somethingElse,anotherSomethingElse'
    })
    await sleep()
    expect(values(firebase._.watchers)).to.eql([1, 1])
  })

  it.skip('correctly maintains watcher count when props change with removed listener paths', async () => {
    const { parent, firebase } = createContainer()
    await sleep()
    parent.setState({
      dynamic: 'somethingElse, anotherSomethingElse'
    })
    await sleep()
    parent.setState({
      dynamic: 'somethingElse'
    })
    await sleep()
    expect(values(firebase._.watchers)).to.eql([1])
  })
})

describe('createUseFirebaseConnect', () => {
  it('accepts a different store key', () => {
    createUseFirebaseConnect('store2')
  })
})
