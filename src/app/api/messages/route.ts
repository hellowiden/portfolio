//src/app/api/messages/route.ts

import { NextResponse } from 'next/server';
import Message from '@/models/message';
import { connectToDatabase } from '@/libs/mongodb';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token || !token.id || !token.name || !token.email) {
      console.error('Unauthorized access attempt to /api/messages');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { message, budget, reason } = await req.json();

    if (!message?.trim()) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Validate budget if provided
    const validBudgets = ['under_100', '100_500', '500_1000', '1000_plus'];
    if (budget && !validBudgets.includes(budget)) {
      return NextResponse.json(
        { error: 'Invalid budget value' },
        { status: 400 }
      );
    }

    // Validate reason if provided
    const validReasons = ['job_offer', 'issues', 'general'];
    if (reason && !validReasons.includes(reason)) {
      return NextResponse.json(
        { error: 'Invalid reason value' },
        { status: 400 }
      );
    }

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
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const messages = await Message.find().sort({ createdAt: -1 });

    return NextResponse.json({ messages }, { status: 200 });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await connectToDatabase();
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Extract the message ID from the URL
    const id = req.nextUrl.pathname.split('/').pop(); // Get the ID from the URL path
    if (!id) {
      return NextResponse.json(
        { error: 'Message ID is required' },
        { status: 400 }
      );
    }

    // Delete the message by ID
    const deletedMessage = await Message.findByIdAndDelete(id);

    if (!deletedMessage) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Message deleted' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting message:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
