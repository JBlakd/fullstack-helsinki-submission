require('dotenv').config()

const PORT = process.env.PORT

const MONGODB_URI = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

const MONGODB_URI_REDACTED = process.env.MONGODB_URI_REDACTED
module.exports = {
  MONGODB_URI,
  MONGODB_URI_REDACTED,
  PORT
}