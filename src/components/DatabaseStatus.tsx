'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface DatabaseStatus {
  database: {
    connected: boolean
    status: string
    lastCheck: string
    timeSinceLastCheck: string
  }
  timestamp: string
}

export default function DatabaseStatus() {
  const [status, setStatus] = useState<DatabaseStatus | null>(null)
  const [loading, setLoading] = useState(true)

  const checkStatus = async () => {
    try {
      const response = await fetch('/api/health')
      const data = await response.json()
      setStatus(data)
    } catch (error) {
      console.error('Failed to fetch database status:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkStatus()
    const interval = setInterval(checkStatus, 30000) // Check every 30 seconds
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Database Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gray-400 rounded-full animate-pulse"></div>
            <span>Checking connection...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  const isConnected = status?.database.connected
  const statusColor = isConnected ? 'bg-green-500' : 'bg-red-500'
  const statusText = isConnected ? 'Connected' : 'Disconnected'

  return (
    <Card>
      <CardHeader>
        <CardTitle>Database Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 ${statusColor} rounded-full`}></div>
            <span className="font-medium">{statusText}</span>
          </div>
          {status && (
            <div className="text-sm text-gray-600 space-y-1">
              <div>Status: {status.database.status}</div>
              <div>Last Check: {status.database.timeSinceLastCheck}</div>
              <div>Updated: {new Date(status.timestamp).toLocaleTimeString()}</div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}