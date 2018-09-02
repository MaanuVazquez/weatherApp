import polka from 'polka'
import controller from '../controllers/apiController'

function getIP(req) {
  return (
    req.headers['x-forwarded-for']
    || req.connection.remoteAddress
    || req.socket.remoteAddress
    || (req.connection.socket ? req.connection.socket.remoteAddress : null)
  )
}

function responseJSON(res, data) {
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(data))
}

const router = polka()
  .get('/location', async (req, res) => {
    responseJSON(res, await controller.getIPAPIInfo(getIP(req)))
  })

  .get('/current', async (req, res) => {
    const userIP = getIP(req)
    const userInfo = await controller.getIPAPIInfo(userIP)
    if (!userIP || !userInfo || !userInfo.city) {
      res.statusCode = 400
      responseJSON(res, { message: 'Bad request' })
    }

    responseJSON(res, await controller.getCurrentWeather(userInfo.city))
  })

  .get('/current/:city', async (req, res) => {
    const { city } = req.params
    responseJSON(res, await controller.getCurrentWeather(city))
  })

  .get('/forecast', async (req, res) => {
    const userIP = getIP(req)
    const userInfo = await controller.getIPAPIInfo(userIP)
    if (!userIP || !userInfo || !userInfo.city) {
      res.statusCode = 400
      responseJSON(res, { message: 'Bad request' })
    }
    responseJSON(res, await controller.getForecast(userInfo.city))
  })

  .get('/forecast/:city', async (req, res) => {
    const { city } = req.params
    responseJSON(res, await controller.getForecast(city))
  })

export default router
