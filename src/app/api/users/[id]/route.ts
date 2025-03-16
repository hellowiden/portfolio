//src/app/api/users/[id]/route.ts

import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '@/models/user';
import { connectToDatabase } from '@/libs/mongodb';
import { NextRequest } from 'next/server';

// Fetch a user by ID
export async function GET(
  req: NextRequest,
  context: { params: { id: string } } // ✅ Fix: No need for Promise<>
): Promise<NextResponse> {
  try {
    await connectToDatabase();
    const { id } = context.params; // ✅ Directly access params (No need to await)

    if (!id) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const user = await User.findById(id).select('-password');

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Update user
export async function PUT(
  req: NextRequest,
  context: { params: { id: string } } // ✅ Fix: No need for Promise<>
): Promise<NextResponse> {
  try {
    await connectToDatabase();
    const { id } = context.params; // ✅ Directly access params (No need to await)

    if (!id) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { name, email, password, roles } = body;

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

    if (password) {
      updateFields.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateFields, {
      new: true,
    }).select('-password');

    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(
      { message: 'User updated', user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// Delete user
export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } } // ✅ Fix: No need for Promise<>
): Promise<NextResponse> {
  try {
    await connectToDatabase();

    const { id } = context.params; // ✅ Directly access params (No need to await)

    if (!id) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User deleted' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
