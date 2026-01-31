
import http from 'http'
import app from './index.js'
import { InitializeSocket } from './socket.js'


const server = http.createServer(app)
InitializeSocket(server)
const port = 8080
server.listen(port, () => {
    console.log("Server listening to 8080")
})


