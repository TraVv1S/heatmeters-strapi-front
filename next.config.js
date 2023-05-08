require('dotenv').config()

module.exports = {
  env: {
    API_URL: process.env.API_URL,
    UPLOADS_URL: process.env.UPLOADS_URL
  }
}