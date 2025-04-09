// src/app/api/users/route.ts

import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '@/models/user';
import { connectToDatabase } from '@/libs/mongodb';

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

    if (!name || !email || !password || !roles) {
      return errorResponse('Missing required fields', 400);
    }

    if (
      !Array.isArray(roles) ||
      roles.length === 0 ||
      !roles.every((role) => typeof role === 'string')
    ) {
      return errorResponse(
        'Invalid roles format. Must be a non-empty array of strings.',
        400
      );
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

    const userResponse = {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      roles: newUser.roles,
    };

    return NextResponse.json(
      { message: 'User created', user: userResponse },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating user:', error);
    return errorResponse('Server error', 500);
  }
}
