const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const port = process.env.PORT || 80

server.use(middlewares)
server.use(router)

// json-server --watch db.json --port $PORT

server.listen(port)
