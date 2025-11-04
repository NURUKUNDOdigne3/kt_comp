const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, dir: './' })
const handle = app.getRequestHandler()
const PORT = process.env.PORT || 3000

// Initialize database connection
require('./db-init.js')

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    handle(req, res, parsedUrl)
  }).listen(PORT, (err) => {
    if (err) throw err
    console.log(`🚀 Server ready on http://localhost:${PORT}`)
    console.log('📊 Database connection: Active')
  })
})