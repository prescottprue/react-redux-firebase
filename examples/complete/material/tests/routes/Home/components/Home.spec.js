import React from 'react'
import Home from 'routes/Home/components/Home'
import { shallow } from 'enzyme'

describe('(Component) Home', () => {
  let _component

  beforeEach(() => {
    _component = shallow(<Home />)
  })

  it('Renders', () => {
    const wrapper = _component.find('div')
    expect(wrapper).to.exist
  })

  it('Renders description', () => {
    const welcome = _component.find('h2')
    expect(welcome).to.exist
  })
})
