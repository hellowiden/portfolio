//src/app/api/messages/id/route.ts

import { connectToDatabase, Message } from '@portfolio/database';
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

interface AuthToken {
  id: string;
  name: string;
  email: string;
  roles?: string[];
}

// Authenticate user and return token
async function authenticateUser(req: NextRequest): Promise<AuthToken | null> {
  const token = (await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })) as AuthToken | null;
  return token?.id && token?.name && token?.email ? token : null;
}

// Get ID from params
async function getParams(context: { params: Promise<Record<string, string>> }) {
  await connectToDatabase();
  return await context.params;
}

// Error response helper
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
    if (!token) return errorResponse('Unauthorized', 401);

    const { id } = await getParams(context);
    if (!id) return errorResponse('Message ID is required', 400);

    const message = await Message.findById(id);
    if (!message) return errorResponse('Message not found', 404);

    const isOwner = message.userId.toString() === token.id;
    const isAdmin = token.roles?.includes('admin');

    if (!isOwner && !isAdmin)
      return errorResponse('Forbidden: You do not have permission', 403);

    await Message.findByIdAndDelete(id);

    return NextResponse.json(
      { message: 'Message deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting message:', error);
    return errorResponse('Server error', 500);
  }
}

/** PUT `/api/messages/[id]` → Update a message */
export async function PUT(
  req: NextRequest,
  context: { params: Promise<Record<string, string>> }
): Promise<NextResponse> {
  try {
    const token = await authenticateUser(req);
    if (!token) return errorResponse('Unauthorized', 401);

    const { id } = await getParams(context);
    if (!id) return errorResponse('Message ID is required', 400);

    const body = await req.json();
    const { message, budget } = body;

    if (!message?.trim()) return errorResponse('Message is required', 400);

    const existing = await Message.findById(id);
    if (!existing) return errorResponse('Message not found', 404);

    const isOwner = existing.userId.toString() === token.id;
    const isAdmin = token.roles?.includes('admin');

    if (!isOwner && !isAdmin)
      return errorResponse('Forbidden: You do not have permission', 403);

    // Apply updates
    existing.message = message.trim();
    if (existing.reason === 'job_offer') {
      existing.budget = budget ?? null;
    }

    await existing.save();

    return NextResponse.json({ message: existing }, { status: 200 });
  } catch (error) {
    console.error('Error updating message:', error);
    return errorResponse('Server error', 500);
  }
}
