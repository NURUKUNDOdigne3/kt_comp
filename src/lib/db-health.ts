import { prisma } from './prisma'

export class DatabaseHealth {
  private static instance: DatabaseHealth
  private isConnected = false
  private lastHealthCheck = 0
  private healthCheckInterval = 30000 // 30 seconds

  static getInstance(): DatabaseHealth {
    if (!DatabaseHealth.instance) {
      DatabaseHealth.instance = new DatabaseHealth()
    }
    return DatabaseHealth.instance
  }

  async checkConnection(): Promise<boolean> {
    try {
      await prisma.$queryRaw`SELECT 1`
      this.isConnected = true
      this.lastHealthCheck = Date.now()
      return true
    } catch (error) {
      console.error('🔴 Database health check failed:', error)
      this.isConnected = false
      return false
    }
  }

  async ensureConnection(): Promise<void> {
    const now = Date.now()
    
    // Check if we need to perform a health check
    if (now - this.lastHealthCheck > this.healthCheckInterval || !this.isConnected) {
      const isHealthy = await this.checkConnection()
      
      if (!isHealthy) {
        console.log('🔄 Attempting to reconnect to database...')
        try {
          await prisma.$connect()
          await this.checkConnection()
          console.log('✅ Database reconnected successfully')
        } catch (error) {
          console.error('❌ Failed to reconnect to database:', error)
          throw new Error('Database connection failed')
        }
      }
    }
  }

  getStatus() {
    return {
      connected: this.isConnected,
      lastCheck: new Date(this.lastHealthCheck).toISOString(),
      timeSinceLastCheck: Date.now() - this.lastHealthCheck
    }
  }

  startHealthMonitoring() {
    setInterval(async () => {
      await this.checkConnection()
    }, this.healthCheckInterval)
    
    console.log('🏥 Database health monitoring started')
  }
}

export const dbHealth = DatabaseHealth.getInstance()