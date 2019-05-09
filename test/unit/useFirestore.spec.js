import React from 'react'
import TestUtils from 'react-dom/test-utils'
import { firebaseWithConfig } from '../utils'
import ReactReduxFirebaseProvider from '../../src/ReactReduxFirebaseProvider'
import useFirestore, { createUseFirestore } from '../../src/useFirestore'
import { createFirestoreInstance } from 'redux-firestore'

describe('useFirestore', () => {
  it('return firestore object', () => {
    const spy = sinon.spy()
    const dispatchSpy = sinon.spy()
    const InnerComponent = ({ spy }) => {
      const firestore = useFirestore()
      spy(firestore)
      return null
    }
    TestUtils.renderIntoDocument(
      <ReactReduxFirebaseProvider
        dispatch={dispatchSpy}
        firebase={firebaseWithConfig()}
        createFirestoreInstance={createFirestoreInstance}
        config={{}}>
        <InnerComponent spy={spy} />
      </ReactReduxFirebaseProvider>
    )
    expect(spy).to.has.been.called
    expect(spy.lastCall.args[0]).to.respondTo('add')
  })
})

describe('createUseFirestore', () => {
  it('return hook', () => {
    expect(createUseFirestore()).to.be.a('function')
  })
})
