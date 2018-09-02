import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import fetch from 'node-fetch'
import dotenv from 'dotenv'
import server from '../../src'

chai.use(chaiHttp)

describe('Integration test', () => {
  describe('Location endpoint', () => {
    it("should return wikipedia's information", async () => {
      const TESTED_IP = '208.80.152.201'
      const response = await fetch(`http://ip-api.com/json/${TESTED_IP}`)
      chai
        .request('http://localhost:3000/')
        .get('v1/location')
        .set('x-forwarded-for', TESTED_IP)
        .end(async (error, res) => {
          expect(error).to.be.null
          expect(res).to.be.json
          expect(res.body).to.be.deep.equal(await response.json())
        })
    })
  })
})
