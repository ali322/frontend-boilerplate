import 'raf/polyfill'
import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Index } from '@/index/app.jsx'

Enzyme.configure({ adapter: new Adapter() })

describe('index component', () => {
  let wrapper, props
  beforeEach(() => {
    props = {
      store: {
        fetchEvents: jest.fn(),
        events: []
      }
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
    expect(props.store.fetchEvents).toHaveBeenCalledTimes(2)
  })
})
