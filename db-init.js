const { PrismaClient } = require('@prisma/client')

const globalForPrisma = globalThis

const prisma = globalForPrisma.prisma ?? new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL + '&connection_limit=20&pool_timeout=60'
    }
  }
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Connect once at startup and keep connection alive
async function connectOnce() {
  if (globalForPrisma.connected) return
  
  try {
    await prisma.$connect()
    console.log('✅ Database connected - connection will persist')
    globalForPrisma.connected = true
  } catch (error) {
    console.error('❌ Database connection failed:', error)
    throw error
  }
}

// Auto-connect immediately
connectOnce().catch(() => {
  console.log('⚠️ Database connection failed at startup')
})

module.exports = { prisma, connectOnce }