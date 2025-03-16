//src/app/api/messages/route.ts

import { NextResponse } from 'next/server';
import Message from '@/models/message';
import { connectToDatabase } from '@/libs/mongodb';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

// Constants for validation
const VALID_BUDGETS = [
  'under_3000',
  '3000_4500',
  '4500_6000',
  '6000_8000',
  '8000_plus',
];
const VALID_REASONS = ['job_offer', 'issues', 'general'];

// Helper function for authentication
interface AuthToken {
  id: string;
  name: string;
  email: string;
  roles?: string[];
}

async function authenticateUser(req: NextRequest): Promise<AuthToken | null> {
  const token = (await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })) as AuthToken | null;
  if (!token || !token.id || !token.name || !token.email) {
    console.error('Unauthorized access attempt');
    return null;
  }
  return token;
}

// Centralized error response
function errorResponse(message: string, status: number): NextResponse {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    await connectToDatabase();
    const token = await authenticateUser(req);
    if (!token) return errorResponse('Unauthorized', 401);

    const body = await req.json();
    const { message, budget, reason } = body;

    console.log('Received budget:', budget);
    console.log('Expected budgets:', VALID_BUDGETS);

    if (!message?.trim()) return errorResponse('Message is required', 400);
    if (budget && !VALID_BUDGETS.includes(budget))
      return errorResponse(`Invalid budget value: ${budget}`, 400);
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

export async function GET(req: NextRequest): Promise<NextResponse> {
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
  context: { params: Promise<{ id?: string }> } // Ensure params is a Promise
): Promise<NextResponse> {
  try {
    await connectToDatabase();
    const token = (await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    })) as AuthToken | null;

    if (!token || !token.roles?.includes('admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await context.params; // Await params before destructuring

    if (!id) {
      const body = await req.json();
      if (!body.id) {
        return NextResponse.json(
          { error: 'Message ID is required' },
          { status: 400 }
        );
      }
    }

    console.log('Received ID for deletion:', id);

    const deletedMessage = await Message.findByIdAndDelete(id);

    if (!deletedMessage) {
      console.log('Message not found in DB:', id);
      return NextResponse.json({ error: 'Message not found' }, { status: 404 });
    }

    console.log('Message deleted successfully:', id);

    return NextResponse.json(
      { message: 'Message deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting message:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
