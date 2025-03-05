// src/app/api/users/route.tsx

import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '@/models/user';
import { connectToDatabase } from '@/libs/mongodb';

// Fetch all users
export async function GET() {
  try {
    await connectToDatabase();
    const users = await User.find().select('-password');
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// Create a new user
export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { name, email, password, roles } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
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
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
