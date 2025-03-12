//src/app/api/messages/id/route.ts

import { NextResponse } from 'next/server';
import Message from '@/models/message';
import { connectToDatabase } from '@/libs/mongodb';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token || !token.roles?.includes('admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Awaiting params to fix the error
    const { id } = await params; // <-- Awaiting params here

    console.log('Received ID for deletion:', id);

    if (!id) {
      return NextResponse.json(
        { error: 'Message ID is required' },
        { status: 400 }
      );
    }

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
