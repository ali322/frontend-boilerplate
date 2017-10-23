import sinon from 'sinon'
import React from 'react'
import { shallow } from 'enzyme'
import { Index } from '@/index/app.jsx'

describe('index component', () => {
  let wrapper, props
  beforeEach(() => {
    props = {
      actions: {
        fetchEvents: sinon.spy()
      },
      events: []
    }
    wrapper = shallow(<Index {...props} />)
  })
  test('should render correct', () => {
    expect(wrapper.find('.content').length).toBe(1)
  })

  test('should call handleRefresh once after click', () => {
    const button = wrapper.find('.refresh-btn')
    button.simulate('click', {
      target: { value: '' },
      preventDefault: () => {}
    })
    expect(props.actions.fetchEvents.callCount).toBe(1)
  })
})
