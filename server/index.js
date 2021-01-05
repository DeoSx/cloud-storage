const express = require('express')
const mongoose = require('mongoose')
const config = require('config')

const cors = require('./middlewares/corsMiddleware')
const authRouter = require('./routes/auth.routes')
const fileRouter = require('./routes/file.routes')

const app = express()

app.use(express.json())
app.use(cors)

app.use('/api/auth', authRouter)
app.use('/api/file', fileRouter)

const start = async () => {
  try {
    await mongoose.connect(config.get('dbUrl'), {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    app.listen(config.get('serverPort'), () => {
      console.log(`Server running on Porn ${config.get('serverPort')}`)
    })
  } catch (e) {}
}

start()
