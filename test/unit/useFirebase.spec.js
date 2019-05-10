import React from 'react'
import TestUtils from 'react-dom/test-utils'
import { firebaseWithConfig } from '../utils'
import ReactReduxFirebaseProvider from '../../src/ReactReduxFirebaseProvider'
import useFirebase, { createUseFirebase } from '../../src/useFirebase'

describe('useFirebase', () => {
  it('return firebase object', () => {
    const spy = sinon.spy()
    const dispatchSpy = sinon.spy()
    const InnerComponent = ({ spy }) => {
      const firebase = useFirebase()
      spy(firebase)
      return null
    }
    TestUtils.renderIntoDocument(
      <ReactReduxFirebaseProvider
        dispatch={dispatchSpy}
        firebase={firebaseWithConfig()}
        config={{}}>
        <InnerComponent spy={spy} />
      </ReactReduxFirebaseProvider>
    )
    expect(spy).to.has.been.called
    expect(spy.lastCall.args[0]).to.respondTo('push')
  })
})

describe('createUseFirebase', () => {
  it('return hook', () => {
    expect(createUseFirebase()).to.be.a('function')
  })
})
