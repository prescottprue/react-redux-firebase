import React from 'react'
import { some, isMatch, filter } from 'lodash'
import { createContainer, sleep } from '../utils'
import useFirestoreConnect from '../../src/useFirestoreConnect'

/* eslint-disable react/prop-types */
function TestComponent({ dynamicProp }) {
  useFirestoreConnect(
    dynamicProp === null
      ? dynamicProp
      : `test${dynamicProp ? '/' + dynamicProp : ''}`,
    [dynamicProp]
  )
  return <div />
}
/* eslint-enable react/prop-types */

describe('useFirestoreConnect', () => {
  it('enables watchers on mount', async () => {
    const { dispatch } = createContainer({ component: TestComponent })
    await sleep()
    expect(
      some(dispatch.args, arg =>
        isMatch(arg[0], {
          type: '@@reduxFirestore/SET_LISTENER',
          meta: { collection: 'test' },
          payload: { name: 'test' }
        })
      )
    ).to.be.true
  })

  it('enables multiple watchers', async () => {
    const { dispatch } = createContainer({
      component: () => {
        useFirestoreConnect(
          [{ collection: 'test1' }, { collection: 'test2' }],
          []
        )
        return null
      }
    })
    await sleep()
    expect(
      some(dispatch.args, arg =>
        isMatch(arg[0], {
          type: '@@reduxFirestore/SET_LISTENER',
          meta: { collection: 'test1' }
        })
      )
    ).to.be.true
    expect(
      some(dispatch.args, arg =>
        isMatch(arg[0], {
          type: '@@reduxFirestore/SET_LISTENER',
          meta: { collection: 'test2' }
        })
      )
    ).to.be.true
  })

  it('disables watchers on unmount', async () => {
    const { wrapper, dispatch } = createContainer({ component: TestComponent })
    await sleep()
    wrapper.unmount()
    await sleep()
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

  it('disables watchers on null as query', async () => {
    const { wrapper, dispatch } = createContainer({ component: TestComponent })
    await sleep()
    wrapper.setState({ dynamic: null })
    await sleep()
    expect(
      filter(dispatch.args, arg =>
        isMatch(arg[0], {
          type: '@@reduxFirestore/SET_LISTENER'
        })
      )
    ).to.have.lengthOf(1)
  })

  it('does not change watchers with props changes that do not change listener paths', async () => {
    const { wrapper, dispatch } = createContainer({ component: TestComponent })
    await sleep()
    wrapper.setState({ test: 'somethingElse' })
    await sleep()
    expect(
      filter(dispatch.args, arg =>
        isMatch(arg[0], {
          type: '@@reduxFirestore/SET_LISTENER'
        })
      )
    ).to.have.lengthOf(1)
  })

  it('reapplies watchers when props change', async () => {
    const { wrapper, dispatch } = createContainer({ component: TestComponent })
    await sleep()
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
})
