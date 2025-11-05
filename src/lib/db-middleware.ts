import { NextRequest, NextResponse } from 'next/server'
import { dbHealth } from '@/lib/db-health'

export async function withDatabase(
  handler: (req: NextRequest) => Promise<NextResponse>
) {
  return async (req: NextRequest, context?: { params: Promise<{}> }) => {
    try {
      // Ensure database connection before processing request
      await dbHealth.ensureConnection()
      return await handler(req)
    } catch (error) {
      console.error('Database middleware error:', error)
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 503 }
      )
    }
  }
}

// Utility function for API routes
export function createDatabaseHandler(
  handler: (req: NextRequest) => Promise<NextResponse>
) {
  return async (req: NextRequest, context: { params: Promise<{}> }) => {
    const dbHandler = await withDatabase(handler)
    return dbHandler(req, context)
  }
}