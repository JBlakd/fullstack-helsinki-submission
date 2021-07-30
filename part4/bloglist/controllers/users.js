const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const logger = require('../utils/logger')

class ValidationError {
  constructor(message) {
    this.message = message
    this.name = 'ValidationError'
  }
}

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 })
  response.json(users)
})

usersRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body
    if (!body.password) {
      throw new ValidationError('Password not defined')
    }
    if (body.password.length < 3) {
      throw new ValidationError('Password shorter than 3 characters')
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
  } catch(exception) {
    next(exception)
  }
})

module.exports = usersRouter