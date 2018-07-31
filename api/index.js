const express = require('express')

// Create express instnace
const app = express()

// Require API routes
const users = require('./routes/users')
const lineBot = require('./routes/callback')

// Import API Routes
app.use(lineBot)
app.use(users)

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
