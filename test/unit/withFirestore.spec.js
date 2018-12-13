import React from 'react'
import { createSink } from 'recompose'
import { shallow } from 'enzyme'
import { storeWithFirestore } from '../utils'
import withFirestore, { createWithFirestore } from '../../src/withFirestore'

let store
let TestComponent
let wrapper

describe('withFirestore', () => {
  beforeEach(() => {
    store = storeWithFirestore()
    TestComponent = withFirestore(createSink)
    wrapper = shallow(<TestComponent />, { context: { store } })
  })

  it.skip('adds firestore as prop', () => {
    expect(wrapper.prop('firestore')).to.exist
    expect(wrapper.prop('firestore')).to.respondTo('add')
  })

  it.skip('adds firebase as prop', () => {
    expect(wrapper.prop('firebase')).to.exist
    expect(wrapper.prop('firebase')).to.respondTo('push')
  })

  it.skip('adds dispatch as prop', () => {
    expect(wrapper.prop('dispatch')).to.exist
    expect(wrapper.prop('dispatch')).to.be.a.function
  })

  describe('sets displayName static as', () => {
    /* eslint-disable no-template-curly-in-string */
    describe('withFirestore(${WrappedComponentName}) for', () => {
      /* eslint-enable no-template-curly-in-string */
      it.skip('standard components', () => {
        wrapper = shallow(<TestComponent />, { context: { store } })
        expect(wrapper.instance.displayName).to.equal(
          `withFirestore(TestContainer)`
        )
      })

      it('string components', () => {
        const str = 'Test'
        const stringComp = withFirestore(str)
        expect(stringComp.displayName).to.equal(`withFirestore(${str})`)
      })
    })

    it.skip('"Component" for all other types', () => {
      wrapper = shallow(withFirestore()(<div />))
      expect(wrapper.displayName).to.equal('withFirestore(Component)')
    })
  })

  it.skip('sets WrappedComponent static as component which was wrapped', () => {
    wrapper = shallow(<TestComponent />, { context: { store } })
    expect(wrapper.wrappedComponent).to.be.instanceOf(TestComponent)
  })
})

describe('createwithFirestore', () => {
  it('accepts a store key', () => {
    createWithFirestore('store2')
  })
})
