import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Auto-connect when imported
if (typeof window === 'undefined') {
  prisma.$connect()
    .then(() => console.log('✅ Database connected'))
    .catch(err => console.error('❌ Database connection failed:', err))
}

export { prisma }