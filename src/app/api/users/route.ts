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

// Get individual user by ID (GET)
export async function GET_USER(req: Request) {
  try {
    await connectToDatabase();
    const id = req.url.split('/').pop();

    // Runtime check to ensure id is not undefined
    if (!id) {
      return NextResponse.json({ error: 'No ID provided' }, { status: 400 });
    }

    const user = await User.findById(id).select('-password');
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error('Error in GET /users/:id:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// Update individual user (PUT)
export async function PUT(req: Request) {
  try {
    await connectToDatabase();
    const id = req.url.split('/').pop();

    // Runtime check to ensure id is not undefined
    if (!id) {
      return NextResponse.json({ error: 'No ID provided' }, { status: 400 });
    }

    const { name, email, password } = await req.json();

    // Check if user exists
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Hash new password if provided
    let updatedPassword = user.password;
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, password: updatedPassword },
      { new: true }
    );

    return NextResponse.json(
      { message: 'User updated', user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in PUT /users/:id:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// Delete individual user (DELETE)
export async function DELETE(req: Request) {
  try {
    await connectToDatabase();
    const id = req.url.split('/').pop();

    // Runtime check to ensure id is not undefined
    if (!id) {
      return NextResponse.json({ error: 'No ID provided' }, { status: 400 });
    }

    // Check if user exists
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Delete user
    await User.findByIdAndDelete(id);

    return NextResponse.json({ message: 'User deleted' }, { status: 200 });
  } catch (error) {
    console.error('Error in DELETE /users/:id:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// get all users (client-side fetch function)
export const getUsers = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/users', {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch users');
    }

    const data = await res.json();
    return data.users || [];
  } catch (error) {
    console.error('Error loading users:', error);
    return [];
  }
};

/*
// get all users (funkar)
export const getUsers = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/users', {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch users');
    }

    const data = await res.json();
    return data.users || [];
  } catch (error) {
    console.error('Error loading users:', error);
    return [];
  }
};
*/
