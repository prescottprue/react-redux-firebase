import React from 'react'
import { createContainer, TestLeaf } from '../utils'
import withFirebase, { createWithFirebase } from '../../src/withFirebase'

let wrapper
let leaf

describe('withFirebase', () => {
  beforeEach(() => {
    const container = createContainer({ hoc: withFirebase })
    wrapper = container.wrapper
    leaf = container.leaf
  })

  it('adds firebase as prop', () => {
    expect(leaf.prop('firebase')).to.exist
    expect(leaf.prop('firebase')).to.respondTo('push')
  })

  it('adds dispatch as prop', () => {
    expect(leaf.prop('dispatch')).to.exist
    expect(leaf.prop('dispatch')).to.be.a.function
  })

  describe('sets displayName static as', () => {
    /* eslint-disable no-template-curly-in-string */
    describe('withFirebase(${WrappedComponentName}) for', () => {
      /* eslint-enable no-template-curly-in-string */
      it('standard components', () => {
        const component = withFirebase(TestLeaf)
        expect(component.displayName).to.equal(`withFirebase(TestLeaf)`)
      })

      it('string components', () => {
        const str = 'Test'
        const stringComp = withFirebase(str)
        expect(stringComp.displayName).to.equal(`withFirebase(${str})`)
      })
    })

    it('"Component" for all other types', () => {
      wrapper = withFirebase(() => <div />)
      expect(wrapper.displayName).to.equal('withFirebase(Component)')
    })
  })

  it('sets WrappedComponent static as component which was wrapped', () => {
    expect(leaf).to.match(TestLeaf)
  })
})

describe('createwithFirebase', () => {
  it('accepts a different store key', () => {
    createWithFirebase('store2')
  })
})
