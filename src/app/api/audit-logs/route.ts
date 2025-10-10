import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdminFromHeader } from '@/lib/auth';
import { successResponse, errorResponse, forbiddenResponse } from '@/lib/api-response';

// GET /api/audit-logs - Get all audit logs (Admin only)
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const admin = isAdminFromHeader(authHeader);
    if (!admin) {
      return forbiddenResponse('Admin access required');
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const level = searchParams.get('level');
    const resource = searchParams.get('resource');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');

    const where: any = {};

    // Search filter
    if (search) {
      where.OR = [
        { action: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { userEmail: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Level filter
    if (level && level !== 'all') {
      where.level = level.toUpperCase();
    }

    // Resource filter
    if (resource && resource !== 'all') {
      where.resource = resource;
    }

    // Date range filter
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) {
        where.createdAt.gte = new Date(startDate);
      }
      if (endDate) {
        where.createdAt.lte = new Date(endDate);
      }
    }

    const [logs, total] = await Promise.all([
      prisma.auditLog.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.auditLog.count({ where }),
    ]);

    // Get unique resources for filter
    const resources = await prisma.auditLog.findMany({
      select: { resource: true },
      distinct: ['resource'],
      orderBy: { resource: 'asc' },
    });

    return successResponse({
      logs,
      resources: resources.map(r => r.resource),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get audit logs error:', error);
    return errorResponse('Failed to fetch audit logs', 500);
  }
}

// POST /api/audit-logs - Create audit log entry (Internal use)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, resource, level, description, metadata, userId, userEmail, ipAddress } = body;

    if (!action || !resource) {
      return errorResponse('Action and resource are required');
    }

    const log = await prisma.auditLog.create({
      data: {
        action,
        resource,
        level: level || 'INFO',
        description,
        metadata,
        userId,
        userEmail,
        ipAddress,
      },
    });

    return successResponse(log, 'Audit log created successfully', 201);
  } catch (error) {
    console.error('Create audit log error:', error);
    return errorResponse('Failed to create audit log', 500);
  }
}
