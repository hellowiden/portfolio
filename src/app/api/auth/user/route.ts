import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/libs/mongodb';
import { getToken } from 'next-auth/jwt';
import User from '@/models/user';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    console.log('Token Data:', token); // Debugging log

    if (!token || !token.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await User.findById(token.id).select('role');
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ role: user.role }, { status: 200 });
  } catch (error) {
    console.error('Error in GET user role:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
