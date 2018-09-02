import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import fetch from 'node-fetch'
import dotenv from 'dotenv'
import server from '../../src'

chai.use(chaiHttp)

describe('Integration test', () => {
  before(() => {
    dotenv.config()
  })

  describe('Forecast endpoint', () => {
    it("should return 'user ip' locations forecast", async () => {
      const TESTED_IP = '208.80.152.201'
      const TESTED_CITY = 'San Francisco'
      const { OPEN_WEATHER_API_KEY } = process.env
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${TESTED_CITY}&type=like&units=metric&appid=${OPEN_WEATHER_API_KEY}`,
      )
      chai
        .request('http://localhost:3000/')
        .get('v1/forecast')
        .set('x-forwarded-for', TESTED_IP)
        .end(async (error, res) => {
          expect(error).to.be.null
          expect(res).to.be.json
          const expectedJSON = {
            weather: (await response.json()).list,
          }
          expect(res.body).to.be.instanceof(Object)
          expect(res.body).to.have.property('weather')
          expect(res.body.weather.length).to.be.above(0)
          expect(res.body).to.be.deep.equal(expectedJSON)
        })
    })

    it('should return moscow 5 day forecast weather', async () => {
      const TESTED_CITY = 'Moscow'
      const { OPEN_WEATHER_API_KEY } = process.env
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${TESTED_CITY}&type=like&units=metric&appid=${OPEN_WEATHER_API_KEY}`,
      )
      chai
        .request('http://localhost:3000/')
        .get(`v1/forecast/${TESTED_CITY}`)
        .end(async (error, res) => {
          expect(error).to.be.null
          expect(res).to.be.json
          const expectedJSON = {
            weather: (await response.json()).list,
          }
          expect(res.body).to.be.instanceof(Object)
          expect(res.body).to.have.property('weather')
          expect(res.body.weather.length).to.be.above(0)
          expect(res.body).to.be.deep.equal(expectedJSON)
        })
    })
  })
})
