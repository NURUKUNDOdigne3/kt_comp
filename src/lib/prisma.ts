import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['error'] : ['error'],
  datasources: {
    db: {
      url: process.env.DATABASE_URL + '&connection_limit=5&pool_timeout=20'
    }
  }
})

// Auto-connect with retry
if (typeof window === 'undefined' && !globalForPrisma.prisma) {
  prisma.$connect().catch(() => {
    console.log('⚠️ Database connection will retry on first query')
  })
}

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
