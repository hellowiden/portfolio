// src/app/api/messages/route.ts
import { NextResponse } from 'next/server';
import Message from '@/models/message';
import { connectToDatabase } from '@/libs/mongodb';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';
//import User from '@/models/user'; // Ensure this is at the top of the file

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token || !token.id || !token.name || !token.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { message, budget, reason } = await req.json();
    if (!message || !budget || !reason) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const newMessage = await Message.create({
      userId: token.id,
      userName: token.name, // Store user name
      userEmail: token.email, // Store user email
      message,
      budget,
      reason,
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

    if (!token || !token.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch all messages for all users
    const messages = await Message.find().sort({ createdAt: -1 });

    return NextResponse.json({ messages }, { status: 200 });
  } catch (error) {
    console.error('Error in GET messages:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
