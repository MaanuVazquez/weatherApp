import React from 'react'
import {shallow} from 'enzyme'
import WeatherCard from '../'

const WEATHER = {
  main: {
    temp_max: 99,
    temp_min: 0,
    temp: 20,
    humidity: 100,
    pressure: 1020
  },
  weather: [
    {
      description: 'few clouds'
    }
  ]
}

describe('WeatherCard Component', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<WeatherCard weather={WEATHER}/>)
  })
  describe('rendering', () => {
    it('should render a WeatherCard component', () => {
      expect(wrapper.exists()).toEqual(true)
    })
  })
})
