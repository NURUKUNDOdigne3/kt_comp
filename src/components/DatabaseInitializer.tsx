'use client'

import { useEffect } from 'react'
import { dbHealth } from '@/lib/db-health'

export default function DatabaseInitializer() {
  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        console.log('🚀 Initializing database connection...')
        
        // Start health monitoring
        dbHealth.startHealthMonitoring()
        
        // Perform initial connection check
        await dbHealth.ensureConnection()
        
        console.log('✅ Database initialization completed')
      } catch (error) {
        console.error('❌ Database initialization failed:', error)
      }
    }

    // Only run on client side
    if (typeof window !== 'undefined') {
      initializeDatabase()
    }
  }, [])

  return null // This component doesn't render anything
}