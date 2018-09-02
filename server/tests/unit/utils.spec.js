import { expect } from 'chai'
import { normalizeCityName } from '../../src/utils'

describe('Utils', () => {
  it('should return the name of the city given without the parentheses', () => {
    expect(normalizeCityName('Buenos Aires (Palermo)')).to.be.equal('Buenos Aires')
  })

  it('should return the name of the city', () => {
    expect(normalizeCityName('Buenos Aires')).to.be.equal('Buenos Aires')
  })
})
