const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, dir: './' })
const handle = app.getRequestHandler()
const PORT = process.env.PORT || 3000

// Initialize database connection
const { connectOnce } = require('./db-init.js')

async function startServer() {
  try {
    // Ensure database is connected before starting server
    console.log('🔄 Connecting to database...')
    await connectOnce()
    
    // Prepare Next.js app
    await app.prepare()
    
    // Start HTTP server
    createServer((req, res) => {
      const parsedUrl = parse(req.url, true)
      handle(req, res, parsedUrl)
    }).listen(PORT, (err) => {
      if (err) throw err
      console.log(`🚀 Server ready on http://localhost:${PORT}`)
      console.log('📊 Database connection: Active and persistent')
    })
  } catch (error) {
    console.error('🚨 Failed to start server:', error)
    process.exit(1)
  }
}

startServer()