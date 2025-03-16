//src/app/api/auth/user/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { connectToDatabase } from '@/libs/mongodb';
import User from '@/models/user';

// Centralized error response function
function errorResponse(message: string, status: number): NextResponse {
  return NextResponse.json({ error: message }, { status });
}

/** GET `/api/auth/user` → Retrieve user roles */
export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token?.id) return errorResponse('Unauthorized', 401);

    // If roles are available in token, return immediately
    if (token.roles)
      return NextResponse.json({ roles: token.roles }, { status: 200 });

    await connectToDatabase();

    const user = await User.findById(token.id).select('roles');
    if (!user) return errorResponse('User not found', 404);

    return NextResponse.json({ roles: user.roles }, { status: 200 });
  } catch (error) {
    console.error('Error retrieving user roles:', error);
    return errorResponse('Internal server error', 500);
  }
}
