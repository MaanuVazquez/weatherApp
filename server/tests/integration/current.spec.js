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

  describe('Current endpoint', () => {
    it("should return 'user ip' locations current weather", async () => {
      const TESTED_IP = '208.80.152.201'
      const TESTED_CITY = 'San Francisco'
      const { OPEN_WEATHER_API_KEY } = process.env
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/find?q=${TESTED_CITY}&type=like&units=metric&appid=${OPEN_WEATHER_API_KEY}`,
      )
      chai
        .request('http://localhost:3000/')
        .get('v1/current')
        .set('x-forwarded-for', TESTED_IP)
        .end(async (error, res) => {
          expect(error).to.be.null
          expect(res).to.be.json
          const expectedJSON = {
            weather: (await response.json()).list,
          }
          expect(res.body).to.be.instanceof(Array)
          expect(res.body.length).to.be.above(0)
          expect(res.body).to.be.deep.equal(expectedJSON)
        })
    })

    it('should return moscow current weather', async () => {
      const TESTED_CITY = 'Moscow'
      const { OPEN_WEATHER_API_KEY } = process.env
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/find?q=${TESTED_CITY}&type=like&units=metric&appid=${OPEN_WEATHER_API_KEY}`,
      )
      chai
        .request('http://localhost:3000/')
        .get(`v1/current/${TESTED_CITY}`)
        .end(async (error, res) => {
          expect(error).to.be.null
          expect(res).to.be.json
          const expectedJSON = {
            weather: (await response.json()).list,
          }
          expect(res.body).to.be.instanceof(Array)
          expect(res.body.length).to.be.above(0)
          expect(res.body).to.be.deep.equal(expectedJSON)
        })
    })
  })
})
