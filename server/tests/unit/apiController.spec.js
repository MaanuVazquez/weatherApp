import { expect } from 'chai'
import fetch from 'node-fetch'
import dotenv from 'dotenv'
import controller from '../../src/controllers/apiController'

function currentWeatherURL(city, key) {
  return `https://api.openweathermap.org/data/2.5/find?q=${city}&type=like&units=metric&appid=${key}`
}

function forecastURL(city, key) {
  return `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=5&type=like&units=metric&appid=${key}`
}

describe('Unit test', () => {
  before(() => {
    dotenv.config()
  })
  describe('API v1 Controller', () => {
    it('should get the IP-API information from the given IP', async () => {
      const IP_TO_BE_TESTED = '208.80.152.201'
      const { OPEN_WEATHER_API_KEY } = process.env
      const response = await fetch(`http://ip-api.com/json/${IP_TO_BE_TESTED}`)
      expect(await controller.getIPAPIInfo(IP_TO_BE_TESTED)).to.deep.equal(await response.json())
    })

    it('should get the current weather information from the given city', async () => {
      const CITY_TO_BE_TESTED = 'Buenos Aires'
      const { OPEN_WEATHER_API_KEY } = process.env
      const response = await fetch(currentWeatherURL(CITY_TO_BE_TESTED, OPEN_WEATHER_API_KEY))
      const weather = { weather: (await response.json()).list }
      expect(await controller.getCurrentWeather(CITY_TO_BE_TESTED)).to.deep.equal(weather)
    })

    it('should get the 5 day forecast from the given city', async () => {
      const { OPEN_WEATHER_API_KEY } = process.env
      const CITY_TO_BE_TESTED = 'Buenos Aires'
      const response = await fetch(forecastURL(CITY_TO_BE_TESTED, OPEN_WEATHER_API_KEY))
      const weather = { weather: (await response.json()).list }
      expect(await controller.getForecast(CITY_TO_BE_TESTED)).to.deep.equal(weather)
    })
  })
})
