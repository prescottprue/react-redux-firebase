import React from 'react'
import TextField from 'components/TextField'
import { shallow } from 'enzyme'

describe('(Component) TextField', () => {
  let _component

  beforeEach(() => {
    _component = shallow(
      <TextField
        type='text'
        label='some label'
        touched={false}
        input={{}}
      />
    )
  })
  it.skip('throws for no type', () => {
    expect(shallow(<TextField />)).to.throw(Error)
  })

  it.skip('Renders div', () => {
    const firstDiv = _component.find('div')
    expect(firstDiv).to.exist
  })
})
