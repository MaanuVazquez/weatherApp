export const API_URL = '/v1'

export async function fetchApi(endpoint) {
  const response = await fetch(`${API_URL}/${endpoint}`)
  return response.json()
}

export function weatherToEmoji(weather) {
  switch (weather) {
    case 'few clouds':
      return '🌤'
    case 'scattered clouds':
      return '⛅'
    case 'broken clouds':
      return '☁'
    case 'shower rain':
      return '🌧'
    case 'rain':
      return '🌦'
    case 'thunderstorm':
      return '⛈'
    case 'snow':
      return '🌨'
    case 'mist':
      return '💨'
    default:
      return '🌞'
  }
}
