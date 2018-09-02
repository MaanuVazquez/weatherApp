import React from 'react'
import {mount} from 'enzyme'
import SelectForm from '../'

describe('SelectForm Component', () => {
  let wrapper
  const onSubmit = jest.fn(() => true)
  beforeEach(() => {
    wrapper = mount(<SelectForm onSubmit={onSubmit}/>)
  })
  describe('rendering', () => {
    it('should render a SelectForm component', () => {
      expect(wrapper.exists()).toEqual(true)
    })
  })
  describe('callbacks', () => {
    it('should call the onSubmit', () => {
      wrapper.find('form').simulate('submit')
      expect(onSubmit).toHaveBeenCalled()
    })
  })
})
