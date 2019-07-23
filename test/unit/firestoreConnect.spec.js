import React from 'react'
import { some, isMatch, filter } from 'lodash'
import { sleep, createContainer, TestLeaf } from '../utils'
import firestoreConnect, { createFirestoreConnect } from 'firestoreConnect'

/* eslint-disable react/prop-types */
const withFirestoreConnect = firestoreConnect(props => [
  props.dynamicProp ? `test/${props.dynamicProp}` : 'test'
])
/* eslint-enable react/prop-types */

describe('firestoreConnect', () => {
  it('should render if Firestore does not exist', () => {
    const { component } = createContainer({
      withFirestore: false,
      hoc: withFirestoreConnect
    })
    expect(component).to.have.lengthOf(1)
  })

  it('disables watchers on unmount', () => {
    const { wrapper, dispatch } = createContainer({ hoc: withFirestoreConnect })
    wrapper.unmount()
    expect(
      some(dispatch.args, arg =>
        isMatch(arg[0], {
          type: '@@reduxFirestore/UNSET_LISTENER',
          meta: { collection: 'test' },
          payload: { name: 'test' }
        })
      )
    ).to.be.true
  })

  it('does not change watchers with props changes that do not change listener paths', async () => {
    const { wrapper, dispatch } = createContainer({ hoc: withFirestoreConnect })
    wrapper.setState({ test: 'somethingElse' })
    expect(
      filter(dispatch.args, arg =>
        isMatch(arg[0], {
          type: '@@reduxFirestore/SET_LISTENER'
        })
      )
    ).to.have.lengthOf(1)
  })

  it('reapplies watchers when props change', async () => {
    const { wrapper, dispatch } = createContainer({ hoc: withFirestoreConnect })
    wrapper.setState({ dynamic: 'somethingElse' })
    await sleep()
    expect(
      filter(dispatch.args, arg =>
        isMatch(arg[0], {
          type: '@@reduxFirestore/UNSET_LISTENER',
          meta: { collection: 'test' },
          payload: { name: 'test' }
        })
      )
    ).to.have.lengthOf(1)
    expect(
      filter(dispatch.args, arg =>
        isMatch(arg[0], {
          type: '@@reduxFirestore/SET_LISTENER',
          meta: { collection: 'test', doc: 'somethingElse' },
          payload: { name: 'test/somethingElse' }
        })
      )
    ).to.have.lengthOf(1)
  })

  describe('sets displayName static as ', () => {
    /* eslint-disable no-template-curly-in-string */
    describe('FirestoreConnect(${WrappedComponentName}) for', () => {
      /* eslint-enable no-template-curly-in-string */
      it('standard components', () => {
        const containerPrime = firestoreConnect()(TestLeaf)
        expect(containerPrime.displayName).to.equal(
          `FirestoreConnect(TestLeaf)`
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

  it('sets WrappedComponent static as component which was wrapped', () => {
    const containerPrime = firestoreConnect()(TestLeaf)
    expect(containerPrime.wrappedComponent).to.equal(TestLeaf)
  })
})

describe('createFirestoreConnect', () => {
  it('creates a function', () => {
    expect(createFirestoreConnect('store2')).to.be.a.function
  })
})
