import path from 'path'
import polka from 'polka'
import morgan from 'morgan'
import dotenv from 'dotenv'
import serve from 'serve-static'
import api from './routes/api'

dotenv.config()

const { PORT = 3000 } = process.env
console.info(__dirname)

const server = polka()
  .use(morgan('tiny'))
  .use('/v1', api)
  // .use(serve(path.join(__dirname, '../public')))
  .listen(PORT)
  .then(() => {
    console.info(`> Running on localhost:${PORT}`)
  })

export function killServer() {
  server.stop()
}

export default server
