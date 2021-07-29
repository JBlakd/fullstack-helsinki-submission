const mongoose = require('mongoose')
const config = require('../utils/config')
const logger = require('../utils/logger')
const url = config.MONGODB_URI

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const blogSchema = new mongoose.Schema({
  title: {type: String, required: true},
  author: {type: String, default: 'unknown author'},
  url: {type: String, required: true},
  likes: {type: Number, default: 0}
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog