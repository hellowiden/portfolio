import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '@/models/user';
import { connectToDatabase } from '@/libs/mongodb';

// Create a new user (POST)
export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { name, email, password } = await req.json();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      { message: 'User created', user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in POST /users:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// Get all users (GET)
export async function GET() {
  try {
    await connectToDatabase();
    const users = await User.find().select('-password');
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error('Error in GET /users:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
