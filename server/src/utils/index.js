import querystring from 'querystring'

export function normalizeCityName(city) {
  const decodedCity = querystring.unescape(city)
  if (decodedCity.indexOf(' (') === -1) return city
  return decodedCity.slice(0, decodedCity.indexOf(' ('))
}
