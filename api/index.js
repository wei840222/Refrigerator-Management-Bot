const express = require('express')

// Create express instnace
const app = express()

// Require API routes
const lineBot = require('./routes/lineBot')
const users = require('./routes/users')

// Import API Routes
app.use(lineBot)
app.use(users)

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
