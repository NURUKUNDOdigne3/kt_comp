import { NextRequest, NextResponse } from 'next/server'
import { dbHealth } from '@/lib/db-health'
import { createDatabaseHandler } from '@/lib/db-middleware'

async function handler(req: NextRequest) {
  if (req.method !== 'GET') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
  }

  try {
    const status = dbHealth.getStatus()
    const isHealthy = await dbHealth.checkConnection()
    
    return NextResponse.json({
      database: {
        connected: isHealthy,
        status: status.connected ? 'healthy' : 'unhealthy',
        lastCheck: status.lastCheck,
        timeSinceLastCheck: `${Math.round(status.timeSinceLastCheck / 1000)}s ago`
      },
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json({
      database: {
        connected: false,
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      timestamp: new Date().toISOString()
    }, { status: 503 })
  }
}

export const GET = createDatabaseHandler(handler)