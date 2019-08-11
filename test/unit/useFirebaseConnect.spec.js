import React from 'react'
import { createContainer, sleep } from '../utils'
import { some, isMatch, filter } from 'lodash'
import useFirebaseConnect, {
  createUseFirebaseConnect
} from '../../src/useFirebaseConnect'

/* eslint-disable react/prop-types */
function TestComponent({ dynamicProp }) {
  useFirebaseConnect(dynamicProp || `test/start`, [dynamicProp])
  return <div />
}
/* eslint-enable react/prop-types */

describe('useFirebaseConnect', () => {
  it('enebles watchers on mount', async () => {
    const { dispatch } = createContainer({ component: TestComponent })
    await sleep(3)

    expect(
      some(dispatch.args, arg =>
        isMatch(arg[0], {
          type: '@@reactReduxFirebase/SET_LISTENER',
          path: 'test/start'
        })
      )
    ).to.be.true
  })

  it('enables multiple watchers', async () => {
    const { dispatch } = createContainer({
      component: () => {
        useFirebaseConnect(['test1', 'test2'], [])
        return null
      }
    })
    await sleep()
    expect(
      some(dispatch.args, arg =>
        isMatch(arg[0], {
          type: '@@reactReduxFirebase/SET_LISTENER',
          path: 'test1'
        })
      )
    ).to.be.true
    expect(
      some(dispatch.args, arg =>
        isMatch(arg[0], {
          type: '@@reactReduxFirebase/SET_LISTENER',
          path: 'test2'
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
          type: '@@reactReduxFirebase/UNSET_LISTENER',
          path: 'test/start'
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
          type: '@@reactReduxFirebase/SET_LISTENER'
        })
      )
    ).to.have.lengthOf(1)
  })

  it('does not change watchers props changes that do not change listener paths', async () => {
    const { wrapper, dispatch } = createContainer({ component: TestComponent })
    await sleep()
    wrapper.setState({ test: 'somethingElse' })
    await sleep()
    expect(
      filter(dispatch.args, arg =>
        isMatch(arg[0], {
          type: '@@reactReduxFirebase/SET_LISTENER'
        })
      )
    ).to.have.lengthOf(1)
  })

  it('reapplies watchers when props change', async () => {
    const { wrapper, dispatch } = createContainer({ component: TestComponent })
    await sleep()
    wrapper.setState({ dynamic: 'test/somethingElse' })
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
})

describe('createUseFirebaseConnect', () => {
  it('accepts a different store key', () => {
    createUseFirebaseConnect('store2')
  })
})
