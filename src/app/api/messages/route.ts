//src/app/api/messages/route.ts

import { NextResponse } from 'next/server';
import Message from '@/models/message';
import { connectToDatabase } from '@/libs/mongodb';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

// Constants for validation
const VALID_BUDGETS = ['under_100', '100_500', '500_1000', '1000_plus'];
const VALID_REASONS = ['job_offer', 'issues', 'general'];

// Helper function for authentication
async function authenticateUser(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token || !token.id || !token.name || !token.email) {
    console.error('Unauthorized access attempt');
    return null;
  }
  return token;
}

// Centralized error response
function errorResponse(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const token = await authenticateUser(req);
    if (!token) return errorResponse('Unauthorized', 401);

    const { message, budget, reason } = await req.json();

    if (!message?.trim()) return errorResponse('Message is required', 400);
    if (budget && !VALID_BUDGETS.includes(budget))
      return errorResponse('Invalid budget value', 400);
    if (reason && !VALID_REASONS.includes(reason))
      return errorResponse('Invalid reason value', 400);

    const newMessage = await Message.create({
      userId: token.id,
      userName: token.name,
      userEmail: token.email,
      message: message.trim(),
      budget: budget || null,
      reason: reason || null,
    });

    return NextResponse.json(
      { message: 'Message sent successfully', data: newMessage },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in POST:', error);
    return errorResponse('Server error', 500);
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const token = await authenticateUser(req);
    if (!token) return errorResponse('Unauthorized', 401);

    const messages = await Message.find().sort({ createdAt: -1 });
    return NextResponse.json({ messages }, { status: 200 });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return errorResponse('Server error', 500);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params?: { id?: string } }
) {
  try {
    await connectToDatabase();
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token || !token.roles?.includes('admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let id = params?.id;

    if (!id) {
      // Fallback: Try extracting ID from the body if not in URL
      const body = await req.json();
      id = body.id;
    }

    console.log('Received ID for deletion:', id); // Debugging log

    if (!id)
      return NextResponse.json(
        { error: 'Message ID is required' },
        { status: 400 }
      );

    const deletedMessage = await Message.findByIdAndDelete(id);

    if (!deletedMessage) {
      console.log('Message not found in DB:', id); // Debugging log
      return NextResponse.json({ error: 'Message not found' }, { status: 404 });
    }

    console.log('Message deleted successfully:', id); // Debugging log

    return NextResponse.json(
      { message: 'Message deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting message:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
