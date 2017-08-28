import React from 'react'
import AccountForm from 'routes/Account/components/AccountForm'
import { shallow } from 'enzyme'

describe('(Account:Component) AccountForm', () => {
  let _component

  beforeEach(() => {
    _component = shallow(
      <AccountForm
        handleSubmit={() => console.log('handle submit called')} // eslint-disable-line no-console
      />
    )
  })

  // Skipped due to need for store
  it.skip('Renders div', () => {
    const firstDiv = _component.find('div')
    expect(firstDiv).to.exist
  })
})
