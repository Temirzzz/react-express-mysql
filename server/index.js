const express = require('express')
const app = express()
const api = require('./api/api.js')

const cors = require('cors')
const port = process.env.port || 3500

app.use(express.json())

app.use(cors({
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST']
}))

app.use('/api/user', api)


const start = async () => {
  try {
    await app.listen(port, () => console.log(`server works on http://localhost:${port}`))
  } catch (error) {
    console.log(error)
  }
}

start()