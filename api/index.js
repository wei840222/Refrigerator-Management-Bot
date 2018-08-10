const express = require('express')

// Create express instnace
const app = express()

// Require API routes
const lineBot = require('./routes/lineBot')

// Import API Routes
app.use(lineBot)

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
