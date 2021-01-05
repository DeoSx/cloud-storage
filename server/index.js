const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const fileUpload = require('express-fileupload')
const cors = require('cors')

const authRouter = require('./routes/auth.routes')
const fileRouter = require('./routes/file.routes')

const app = express()

app.use(fileUpload())
app.use(cors())
app.use(express.json())
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
