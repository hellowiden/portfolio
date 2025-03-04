// src/app/api/users/[id]/route.tsx

import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '@/models/user';
import { connectToDatabase } from '@/libs/mongodb';

// Get a single user by ID (GET)
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const user = await User.findById(params.id).select('-password'); // Exclude password
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error('Error in GET /users/:id:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// Update user (PUT)
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const { name, email, password, roles } = await req.json();

    // Define the update fields with proper type
    const updateFields: Partial<{
      name: string;
      email: string;
      password?: string;
      roles: string[];
    }> = {
      name,
      email,
      roles,
    };

    // Hash new password if provided
    if (password) {
      updateFields.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(params.id, updateFields, {
      new: true,
    });

    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(
      { message: 'User updated', user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in PUT /users/:id:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// Delete user (DELETE)
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const deletedUser = await User.findByIdAndDelete(params.id);
    if (!deletedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'User deleted' }, { status: 200 });
  } catch (error) {
    console.error('Error in DELETE /users/:id:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
