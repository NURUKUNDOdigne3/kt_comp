import { prisma } from './prisma'

let keepAliveInterval: NodeJS.Timeout | null = null

export function startDatabaseKeepAlive() {
  if (keepAliveInterval) return

  // Ping database every 4 minutes to prevent auto-suspend
  keepAliveInterval = setInterval(async () => {
    try {
      await prisma.$queryRaw`SELECT 1`
      console.log('🔄 Database keepalive ping')
    } catch (error) {
      console.error('❌ Database keepalive failed:', error)
    }
  }, 4 * 60 * 1000) // 4 minutes

  console.log('✅ Database keepalive started')
}

export function stopDatabaseKeepAlive() {
  if (keepAliveInterval) {
    clearInterval(keepAliveInterval)
    keepAliveInterval = null
    console.log('🛑 Database keepalive stopped')
  }
}