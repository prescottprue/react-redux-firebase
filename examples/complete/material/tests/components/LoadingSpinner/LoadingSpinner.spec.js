import React from 'react'
import { LoadingSpinner } from 'components/LoadingSpinner/LoadingSpinner'
import { shallow } from 'enzyme'

describe('(Component) LoadingSpinner', () => {
  let _component

  beforeEach(() => {
    _component = shallow(<LoadingSpinner />)
  })

  it('Renders div', () => {
    const firstDiv = _component.find('div')
    expect(firstDiv).to.exist
  })
})
