import React from 'react'
import { values, some, isMatch, filter } from 'lodash'
import { TestContainer, sleep, createContainer } from '../utils'
import firebaseConnect, {
  createFirebaseConnect
} from '../../src/firebaseConnect'
const DYNAMIC_PROPS_SEPARATOR = ','

const withFirebaseConnect = firebaseConnect(({ dynamicProp }) => {
  const itemsToSubscribe =
    dynamicProp &&
    dynamicProp.split(DYNAMIC_PROPS_SEPARATOR).map(item => `test/${item}`)
  return itemsToSubscribe ? [...itemsToSubscribe] : []
})

const getFirebaseWatchers = firebase => {
  return { ...firebase._.watchers }
}

describe('firebaseConnect', () => {
  it('passes firebase prop to child', () => {
    const { leaf } = createContainer({ hoc: withFirebaseConnect })
    expect(leaf).to.have.prop('firebase')
  })

  it('passes dispatch prop to child', () => {
    const { leaf } = createContainer({ hoc: withFirebaseConnect })
    expect(leaf).to.have.prop('dispatch')
  })

  it('passes through existing props', () => {
    const { leaf } = createContainer({
      hoc: withFirebaseConnect,
      additionalComponentProps: { pass: 'through' }
    })
    expect(leaf).to.have.prop('pass', 'through')
  })

  it('enebles watchers on mount', async () => {
    const { dispatch } = createContainer({
      hoc: withFirebaseConnect,
      additionalComponentProps: { dynamic: 'start' }
    })
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
    const { wrapper, dispatch } = createContainer({
      hoc: withFirebaseConnect,
      additionalComponentProps: { dynamic: 'start' }
    })
    wrapper.unmount()
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
    const { wrapper, dispatch } = createContainer({
      hoc: withFirebaseConnect,
      additionalComponentProps: { dynamic: 'start' }
    })
    wrapper.setState({ test: 'somethingElse' })
    expect(
      filter(dispatch.args, arg =>
        isMatch(arg[0], {
          type: '@@reactReduxFirebase/SET_LISTENER'
        })
      )
    ).to.have.lengthOf(1)
  })

  it('reapplies watchers when props change', async () => {
    const { wrapper, dispatch } = createContainer({
      hoc: withFirebaseConnect,
      additionalComponentProps: { dynamic: 'start' }
    })
    await sleep()
    wrapper.setState({ dynamic: 'somethingElse' })
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

  it('applies new watchers when props change', async () => {
    const { wrapper, dispatch } = createContainer({
      hoc: withFirebaseConnect,
      additionalComponentProps: { dynamic: 'somethingElse' }
    })

    wrapper.setState({
      dynamic: 'somethingElse,anotherSomethingElse'
    })
    await sleep()

    expect(
      filter(dispatch.args, arg =>
        isMatch(arg[0], {
          type: '@@reactReduxFirebase/SET_LISTENER',
          path: 'test/somethingElse'
        })
      )
    ).to.have.lengthOf(1)
    expect(
      filter(dispatch.args, arg =>
        isMatch(arg[0], {
          type: '@@reactReduxFirebase/SET_LISTENER',
          path: 'test/anotherSomethingElse'
        })
      )
    ).to.have.lengthOf(1)

    expect(dispatch).to.not.calledWithMatch({
      type: '@@reactReduxFirebase/UNSET_LISTENER'
    })
  })

  it('correctly maintains watcher count when props change with extra listener paths', async () => {
    const { wrapper, firebase } = createContainer({ hoc: withFirebaseConnect })
    wrapper.setState({
      dynamic: 'somethingElse'
    })

    wrapper.setState({
      dynamic: 'somethingElse,anotherSomethingElse'
    })

    await sleep()

    expect(values(getFirebaseWatchers(firebase))).to.eql([1, 1])
  })

  it('correctly maintains watcher count when props change with removed listener paths', async () => {
    const { wrapper, firebase } = createContainer({
      hoc: withFirebaseConnect
    })
    wrapper.setState({
      dynamic: 'somethingElse,anotherSomethingElse'
    })

    wrapper.setState({
      dynamic: 'somethingElse'
    })

    await sleep()

    expect(values(getFirebaseWatchers(firebase))).to.eql([1])
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
    const containerPrime = firebaseConnect()(TestContainer)
    expect(containerPrime.wrappedComponent).to.equal(TestContainer)
  })
})

describe('createFirebaseConnect', () => {
  it('accepts a different store key', () => {
    createFirebaseConnect('store2')
  })
})
