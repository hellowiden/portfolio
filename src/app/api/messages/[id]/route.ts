//src/app/api/messages/id/route.ts

import { NextResponse } from 'next/server';
import Message from '@/models/message';
import { connectToDatabase } from '@/libs/mongodb';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } } // ✅ Correctly destructuring params
) {
  try {
    await connectToDatabase();
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token || !token.roles?.includes('admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!params.id) {
      return NextResponse.json(
        { error: 'Message ID is required' },
        { status: 400 }
      );
    }

    const deletedMessage = await Message.findByIdAndDelete(params.id);

    if (!deletedMessage) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 });
    }

    return NextResponse.json(
      { message: 'Message deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting message:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
