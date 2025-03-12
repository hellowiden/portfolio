import { NextResponse } from 'next/server';
import Message from '@/models/message';
import { connectToDatabase } from '@/libs/mongodb';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

// Update message (admin response)
export async function PUT(req: NextRequest) {
  try {
    await connectToDatabase();
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token || !token.roles?.includes('admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const id = req.nextUrl.pathname.split('/').pop(); // Extracts ID from URL
    if (!id) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

    const { response, isResolved } = await req.json();
    if (response === undefined || isResolved === undefined) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const updatedMessage = await Message.findByIdAndUpdate(
      id,
      { response, isResolved },
      { new: true }
    );

    if (!updatedMessage) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 });
    }

    return NextResponse.json(
      { message: 'Response added successfully', data: updatedMessage },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating message:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// Delete message
export async function DELETE(req: NextRequest) {
  try {
    await connectToDatabase();
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token || !token.roles?.includes('admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const id = req.nextUrl.pathname.split('/').pop(); // Extracts ID from URL
    if (!id) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

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
