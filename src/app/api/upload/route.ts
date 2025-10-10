import { NextRequest } from 'next/server';
import { getCurrentUserFromHeader, isAdminFromHeader } from '@/lib/auth';
import { uploadImage } from '@/lib/cloudinary';
import { successResponse, errorResponse, unauthorizedResponse, forbiddenResponse } from '@/lib/api-response';

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const user = getCurrentUserFromHeader(authHeader);

    if (!user) {
      return unauthorizedResponse('Authentication required');
    }

    const isAdmin = isAdminFromHeader(authHeader);
    if (!isAdmin) {
      return forbiddenResponse('Admin access required');
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = formData.get('folder') as string || 'products';

    if (!file) {
      return errorResponse('No file provided');
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString('base64');
    const dataURI = `data:${file.type};base64,${base64}`;

    // Upload to Cloudinary
    const result = await uploadImage(dataURI, folder);

    return successResponse(result, 'Image uploaded successfully');
  } catch (error) {
    console.error('Upload error:', error);
    return errorResponse('Failed to upload image', 500);
  }
}
