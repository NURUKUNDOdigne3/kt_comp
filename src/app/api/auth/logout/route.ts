import { NextRequest } from 'next/server';
import { successResponse } from '@/lib/api-response';

export async function POST(request: NextRequest) {
  // With localStorage, logout is handled client-side
  // This endpoint just confirms the logout
  return successResponse(null, 'Logout successful');
}
