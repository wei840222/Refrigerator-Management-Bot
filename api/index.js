const express = require('express')

// Create express instnace
const app = express()

// Require API routes
const callback = require('./routes/callback')
const users = require('./routes/users')

// Import API Routes
app.use(callback)
app.use(users)

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
