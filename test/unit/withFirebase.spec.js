import React from 'react'
import { createSink } from 'recompose'
import { shallow } from 'enzyme'
import { storeWithFirebase } from '../utils'
import withFirebase, { createWithFirebase } from '../../src/withFirebase'

let store
let TestComponent
let wrapper

describe('withFirebase', () => {
  beforeEach(() => {
    store = storeWithFirebase()
    TestComponent = withFirebase(createSink)
    wrapper = shallow(<TestComponent />, { context: { store } })
  })

  it('adds firebase as prop', () => {
    expect(wrapper.prop('firebase')).to.exist
    expect(wrapper.prop('firebase')).to.respondTo('push')
  })

  it('adds dispatch as prop', () => {
    expect(wrapper.prop('dispatch')).to.exist
    expect(wrapper.prop('dispatch')).to.be.a.function
  })

  describe('sets displayName static as', () => {
    describe('withFirebase(${WrappedComponentName}) for', () => { // eslint-disable-line no-template-curly-in-string
      it.skip('standard components', () => {
        wrapper = shallow(<TestComponent />, { context: { store } })
        expect(wrapper.instance.displayName).to.equal(`withFirebase(TestContainer)`)
      })

      it('string components', () => {
        const str = 'Test'
        const stringComp = withFirebase(str)
        expect(stringComp.displayName).to.equal(`withFirebase(${str})`)
      })
    })

    it.skip('"Component" for all other types', () => {
      wrapper = shallow(withFirebase()(<div />))
      expect(wrapper.displayName).to.equal('withFirebase(Component)')
    })
  })

  it.skip('sets WrappedComponent static as component which was wrapped', () => {
    wrapper = shallow(<TestComponent />, { context: { store } })
    expect(wrapper.wrappedComponent).to.be.instanceOf(TestComponent)
  })
})

describe('createwithFirebase', () => {
  it('accepts a different store key', () => {
    createWithFirebase('store2')
  })
})
