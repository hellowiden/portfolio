//src/app/api/messages/id/route.ts

import { NextRequest, NextResponse } from 'next/server';
import Message from '@/models/message';
import { connectToDatabase } from '@/libs/mongodb';
import { getToken } from 'next-auth/jwt';

interface AuthToken {
  id: string;
  name: string;
  email: string;
  roles?: string[];
}

// Centralized helper functions

// Authenticate user and return token
async function authenticateUser(req: NextRequest): Promise<AuthToken | null> {
  const token = (await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })) as AuthToken | null;
  return token?.id && token?.name && token?.email ? token : null;
}

// Get ID from params (Next.js 14+ requires awaiting params)
async function getParams(context: { params: Promise<Record<string, string>> }) {
  await connectToDatabase();
  return await context.params;
}

// Centralized error response function
function errorResponse(message: string, status: number): NextResponse {
  return NextResponse.json({ error: message }, { status });
}

/** DELETE `/api/messages/[id]` → Delete a message */
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<Record<string, string>> }
): Promise<NextResponse> {
  try {
    const token = await authenticateUser(req);
    if (!token || !token.roles?.includes('admin'))
      return errorResponse('Unauthorized', 401);

    const { id } = await getParams(context);
    if (!id) return errorResponse('Message ID is required', 400);

    const deletedMessage = await Message.findByIdAndDelete(id);
    if (!deletedMessage) return errorResponse('Message not found', 404);

    return NextResponse.json(
      { message: 'Message deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting message:', error);
    return errorResponse('Server error', 500);
  }
}
