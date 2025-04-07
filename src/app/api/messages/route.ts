//src/app/api/messages/route.ts

import { NextRequest, NextResponse } from 'next/server';
import Message from '@/models/message';
import { connectToDatabase } from '@/libs/mongodb';
import { getToken } from 'next-auth/jwt';

// Constants for validation
const VALID_BUDGETS = [
  'under_3000',
  '3000_4500',
  '4500_6000',
  '6000_8000',
  '8000_plus',
];
const VALID_REASONS = ['job_offer', 'issues', 'general'];

interface AuthToken {
  id: string;
  name: string;
  email: string;
  roles?: string[];
}

// Centralized authentication function
async function authenticateUser(req: NextRequest): Promise<AuthToken | null> {
  const token = (await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })) as AuthToken | null;
  return token?.id && token?.name && token?.email ? token : null;
}

// Centralized error response function
function errorResponse(message: string, status: number): NextResponse {
  return NextResponse.json({ error: message }, { status });
}

/** POST `/api/messages` → Create a new message */
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    await connectToDatabase();
    const token = await authenticateUser(req);
    if (!token) return errorResponse('Unauthorized', 401);

    const { message, budget, reason } = await req.json();
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

/** GET `/api/messages` → Fetch messages for the authenticated user */
export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    await connectToDatabase();
    const token = await authenticateUser(req);
    if (!token) return errorResponse('Unauthorized', 401);

    const messages = await Message.find({ userId: token.id }).sort({
      createdAt: -1,
    });
    return NextResponse.json({ messages }, { status: 200 });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return errorResponse('Server error', 500);
  }
}
