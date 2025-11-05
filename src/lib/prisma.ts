import { PrismaClient } from '@prisma/client'
import { startDatabaseKeepAlive } from './db-keepalive'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
  connected: boolean | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['error'] : ['error']
})

// Auto-connect with retry logic
if (typeof window === 'undefined' && !globalForPrisma.connected) {
  const connectWithRetry = async (retries = 3) => {
    for (let i = 0; i < retries; i++) {
      try {
        await prisma.$connect()
        
        // Wake up database with multiple attempts
        let dbReady = false
        for (let j = 0; j < 5; j++) {
          try {
            await prisma.$queryRaw`SELECT 1`
            dbReady = true
            break
          } catch (dbError) {
            console.log(`🔄 Waking up database... attempt ${j + 1}/5`)
            await new Promise(resolve => setTimeout(resolve, 1000))
          }
        }
        
        if (!dbReady) {
          throw new Error('Database failed to wake up')
        }
        
        console.log('✅ Database connected and ready - connection will persist')
        globalForPrisma.connected = true
        
        // Start keepalive to prevent auto-suspend
        startDatabaseKeepAlive()
        return
      } catch (error) {
        console.error(`❌ Database connection attempt ${i + 1} failed:`, error instanceof Error ? error.message : String(error))
        if (i === retries - 1) {
          console.error('🚨 Database server unreachable - check your connection')
        } else {
          await new Promise(resolve => setTimeout(resolve, 2000))
        }
      }
    }
  }
  
  connectWithRetry()
}

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
