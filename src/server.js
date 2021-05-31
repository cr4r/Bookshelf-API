const Hapi = require('@hapi/hapi')
const routes = require('./routes')

const ipserver = '172.31.20.235'

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : ipserver,
    routes: {
      cors: {
        origin: ['*']
      }
    }
  })

  server.route(routes)

  await server.start()
  console.log(`Server telah berjalan pada ${server.info.uri}`)
}

init()
