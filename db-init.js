const { PrismaClient } = require('@prisma/client')

const globalForPrisma = globalThis

const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Auto-connect once
if (!globalForPrisma.connected) {
  prisma.$connect()
    .then(() => {
      console.log('✅ Database connected')
      globalForPrisma.connected = true
    })
    .catch(err => console.error('❌ Database connection failed:', err))
}

module.exports = { prisma }