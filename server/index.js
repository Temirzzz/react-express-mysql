const api = require('./api/api.js')
const adminApi = require('./api/adminApi.js')
const express = require('express')
const app = express()
const socketServer = require('http').createServer(app)
const io = require('socket.io')(socketServer, {
  cors: {
    origin: 'http://localhost:3000'
  }
})


const cors = require('cors')
const port = process.env.port || 3500

app.use(express.json())

app.use(cors({
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST']
}))

app.use('/api/user', api)
app.use('/api/admin', adminApi)


io.on('connection', socket => {
  console.log(`User connected ${socket.id}`)

  socket.on('joinRoom', data => {
    socket.join(data)
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  })

  socket.on('sendMessage', (data) => {
    socket.to(data.room).emit('receiveMessage', data)
  })



  socket.on('disconnect', () => {
    console.log(`User disconnected ${socket.id}`)
  })
})

const start = async () => {
  try {
    await socketServer.listen(port, () => console.log(`server works on http://localhost:${port}`))
  } catch (error) {
    console.log(error)
  }
}

start()


