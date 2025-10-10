import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdminFromHeader } from '@/lib/auth';
import { successResponse, errorResponse, notFoundResponse, forbiddenResponse } from '@/lib/api-response';

// GET /api/audit-logs/[id] - Get a single audit log (Admin only)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authHeader = request.headers.get('authorization');
    const admin = isAdminFromHeader(authHeader);
    if (!admin) {
      return forbiddenResponse('Admin access required');
    }

    const { id } = await params;

    const log = await prisma.auditLog.findUnique({
      where: { id },
    });

    if (!log) {
      return notFoundResponse('Audit log not found');
    }

    return successResponse(log);
  } catch (error) {
    console.error('Get audit log error:', error);
    return errorResponse('Failed to fetch audit log', 500);
  }
}

// DELETE /api/audit-logs/[id] - Delete an audit log (Admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authHeader = request.headers.get('authorization');
    const admin = isAdminFromHeader(authHeader);
    if (!admin) {
      return forbiddenResponse('Admin access required');
    }

    const { id } = await params;

    await prisma.auditLog.delete({
      where: { id },
    });

    return successResponse(null, 'Audit log deleted successfully');
  } catch (error: any) {
    console.error('Delete audit log error:', error);
    if (error.code === 'P2025') {
      return notFoundResponse('Audit log not found');
    }
    return errorResponse('Failed to delete audit log', 500);
  }
}
