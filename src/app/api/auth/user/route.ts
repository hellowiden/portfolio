//src/app/api/auth/user/route.ts

import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { connectToDatabase } from '@/libs/mongodb';
import User from '@/models/user';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token || !token.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (token.roles) {
      return NextResponse.json({ roles: token.roles }, { status: 200 });
    }

    await connectToDatabase();
    const user = await User.findById(token.id).select('roles');

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ roles: user.roles }, { status: 200 });
  } catch (error) {
    console.error('Error retrieving user roles:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
