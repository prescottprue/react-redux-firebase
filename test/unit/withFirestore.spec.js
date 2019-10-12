import React from 'react'
import { createContainer, TestLeaf } from '../utils'
import withFirestore from '../../src/withFirestore'

let wrapper
let leaf

describe('withFirestore', () => {
  beforeEach(() => {
    const container = createContainer({ hoc: withFirestore })
    wrapper = container.wrapper
    leaf = container.leaf
  })

  it('adds firestore as prop', () => {
    expect(leaf.prop('firestore')).to.exist
    expect(leaf.prop('firestore')).to.respondTo('add')
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
    describe('withFirestore(${WrappedComponentName}) for', () => {
      /* eslint-enable no-template-curly-in-string */
      it('standard components', () => {
        const comp = withFirestore(TestLeaf)
        expect(comp.displayName).to.equal(`withFirestore(TestLeaf)`)
      })

      it('string components', () => {
        const str = 'Test'
        const stringComp = withFirestore(str)
        expect(stringComp.displayName).to.equal(`withFirestore(${str})`)
      })
    })

    it('"Component" for all other types', () => {
      wrapper = withFirestore(() => <div />)
      expect(wrapper.displayName).to.equal('withFirestore(Component)')
    })
  })

  it('sets WrappedComponent static as component which was wrapped', () => {
    expect(leaf).to.match(TestLeaf)
  })
})
