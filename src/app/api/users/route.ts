// src/app/api/users/route.tsx

import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '@/models/user';
import { connectToDatabase } from '@/libs/mongodb';

// Centralized error response function
function errorResponse(message: string, status: number): NextResponse {
  return NextResponse.json({ error: message }, { status });
}

/** GET `/api/users` → Fetch all users */
export async function GET(): Promise<NextResponse> {
  try {
    await connectToDatabase();
    const users = await User.find().select('-password');
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error('Error fetching users:', error);
    return errorResponse('Server error', 500);
  }
}

/** POST `/api/users` → Create a new user */
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    await connectToDatabase();
    const { name, email, password, roles } = await req.json();

    if (!name || !email || !password) {
      return errorResponse('Missing required fields', 400);
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorResponse('User already exists', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      roles,
    });

    return NextResponse.json(
      { message: 'User created', user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating user:', error);
    return errorResponse('Server error', 500);
  }
}
