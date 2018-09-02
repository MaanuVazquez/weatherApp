import React from 'react'
import {shallow} from 'enzyme'
import fetchMock from 'fetch-mock'
import {API_URL} from '../../../utils'
import App from '../'

const LOCATION = {
  as: 'AS14907 Wikimedia Foundation, Inc.',
  city: 'San Francisco (South Beach)',
  country: 'United States',
  countryCode: 'US',
  isp: 'Wikimedia Foundation, Inc.',
  lat: 37.787,
  lon: -122.4,
  org: 'Wikimedia Foundation, Inc.',
  query: '208.80.152.201',
  region: '',
  regionName: 'California',
  status: 'success',
  timezone: 'America/Los_Angeles',
  zip: '94105'
}

const WEATHER = {
  weather: [
    {
      coord: {lon: -122.42, lat: 37.78},
      weather: [
        {id: 701, main: 'Mist', description: 'mist', icon: '50d'},
        {id: 721, main: 'Haze', description: 'haze', icon: '50d'},
        {id: 711, main: 'Smoke', description: 'smoke', icon: '50d'}
      ],
      base: 'stations',
      main: {temp: 25.74, pressure: 1012, humidity: 87, temp_min: 15, temp_max: 33.3},
      visibility: 4828,
      wind: {speed: 3.1, deg: 220},
      clouds: {all: 75},
      dt: 1535928000,
      sys: {type: 1, id: 392, message: 0.0044, country: 'US', sunrise: 1535895690, sunset: 1535942147},
      id: 5391959,
      name: 'San Francisco',
      cod: 200
    }
  ]
}

describe('App Component', () => {
  let wrapper
  beforeEach(() => {
    fetchMock.getOnce(`${API_URL}/location`, LOCATION)
    fetchMock.getOnce(`${API_URL}/current`, WEATHER)
    wrapper = shallow(<App/>)
  })
  describe('rendering', () => {
    it('should render an App component', () => {
      expect(wrapper.exists()).toEqual(true)
    })
  })
})
