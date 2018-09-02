import fetch from 'node-fetch'
import { normalizeCityName } from '../utils'

const API = {
  openWeather: 'https://api.openweathermap.org/data/2.5',
  ipapi: 'http://ip-api.com/json',
}

const controller = {
  async getIPAPIInfo(ip) {
    const response = await fetch(`${API.ipapi}/${ip}`)
    return response.json()
  },

  async getCurrentWeather(city) {
    const { OPEN_WEATHER_API_KEY } = process.env
    const response = await fetch(
      `${API.openWeather}/weather?q=${normalizeCityName(
        city,
      )}&units=metric&appid=${OPEN_WEATHER_API_KEY}`,
    )
    return {
      weather: [await response.json()],
    }
  },

  async getForecast(city) {
    const { OPEN_WEATHER_API_KEY } = process.env
    const response = await fetch(
      `${API.openWeather}/forecast?q=${normalizeCityName(
        city,
      )}&type=like&units=metric&appid=${OPEN_WEATHER_API_KEY}`,
    )
    return {
      weather: (await response.json()).list,
    }
  },
}

export default controller
