import { prisma } from './prisma'

let isConnected = false
let connectionPromise: Promise<void> | null = null

export async function initializeDatabase() {
  if (isConnected) {
    return
  }

  if (connectionPromise) {
    return connectionPromise
  }

  connectionPromise = (async () => {
    try {
      await prisma.$connect()
      // Test the connection with a simple query
      await prisma.$queryRaw`SELECT 1`
      isConnected = true
      console.log('✅ Database initialized and connected')
    } catch (error) {
      console.error('❌ Database initialization failed:', error)
      connectionPromise = null
      throw error
    }
  })()

  return connectionPromise
}

export function isDatabaseConnected() {
  return isConnected
}

// Auto-initialize on server startup
if (typeof window === 'undefined') {
  initializeDatabase().catch(() => {
    console.log('⚠️ Initial database connection failed, will retry on first request')
  })
}