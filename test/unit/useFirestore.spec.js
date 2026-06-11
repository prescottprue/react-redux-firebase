import React from 'react'
import { render, firebaseWithConfig } from '../utils'
import ReactReduxFirebaseProvider from '../../src/ReactReduxFirebaseProvider'
import useFirestore from '../../src/useFirestore'
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
    render(
      <ReactReduxFirebaseProvider
        dispatch={dispatchSpy}
        firebase={firebaseWithConfig()}
        createFirestoreInstance={createFirestoreInstance}
        config={{}}
      >
        <InnerComponent spy={spy} />
      </ReactReduxFirebaseProvider>
    )
    expect(spy).to.has.been.called
    expect(spy.lastCall.args[0]).to.respondTo('add')
  })
})
