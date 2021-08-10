const blogsRouter = require('express').Router()
const logger = require('../utils/logger')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

// const getTokenFrom = (request) => {
//   const authorization = request.get('authorization')
//   if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//     return authorization.substring(7)
//   }
//   return null
// }

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const requestedBlog = await Blog.findById(request.params.id)
  // console.log(requestedBlog)
  response.json(requestedBlog)
})

blogsRouter.post('/', async (request, response, next) => {
  try {
    // const token = getTokenFrom(request)
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: request.body.likes,
      user: user._id
    })

    const result = await blog.save()
    user.blogs = user.blogs.concat(result._id)
    // logger.info('concantenated user blogs: ', user.blogs)
    await user.save()

    response.status(201).json(result)
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    const userFromToken = await User.findById(decodedToken.id)
    logger.info('DELETE decodedToken user:\t\t', userFromToken.toString())

    const requestedBlog = await Blog.findById(request.params.id)
    if (requestedBlog) {
      logger.info('DELETE requestedBlog.user:\t', requestedBlog.user)
      logger.info('Comparison of requestedBlog.user.toString() and decodedToken.id.toString(): ', requestedBlog.user === decodedToken.id)
      if (requestedBlog.user.toString() === decodedToken.id.toString()) {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
        return
      } else {
        response.status(401).json( {error: 'invalid token'} )
      }
    } else {
      // Blog corresponding too request.params.id not found
      response.status(404).json( {error: 'not found'} )
    }
    
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const newBlog = {
    likes: request.body.likes
  }

  try {
    const result = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true })
    logger.info('PUT result:\n', result)
    if (result) {
      response.json(result)
    } else {
      response.status(404).end()
    }
  } catch(exception) {
    next(exception)
  }
})

module.exports = blogsRouter