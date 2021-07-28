const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const Blog = require('./models/blog')
const blogsRouter = require('./controllers/blogs')

logger.info('connecting to', config.MONGODB_URI_REDACTED)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => logger.info("Connected to MongoDB"))
  .catch((error) => logger.error('error connecting to MongoDB: ', error.message))

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)

module.exports = app