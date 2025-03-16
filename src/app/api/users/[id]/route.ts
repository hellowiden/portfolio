//src/app/api/users/[id]/route.ts

import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '@/models/user';
import { connectToDatabase } from '@/libs/mongodb';

// Utility function for handling common logic
async function handleUserRequest(
  context: { params: { id: string } },
  action: (id: string) => Promise<NextResponse>
): Promise<NextResponse> {
  try {
    await connectToDatabase();
    const { id } = context.params;

    if (!id) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    return await action(id);
  } catch (error) {
    console.error('User request error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Fetch a user by ID
export async function GET(
  req: Request,
  context: { params: { id: string } }
): Promise<NextResponse> {
  return handleUserRequest(context, async (id) => {
    const user = await User.findById(id).select('-password');
    return user
      ? NextResponse.json({ user }, { status: 200 })
      : NextResponse.json({ error: 'User not found' }, { status: 404 });
  });
}

// Update user
export async function PUT(
  req: Request,
  context: { params: { id: string } }
): Promise<NextResponse> {
  return handleUserRequest(context, async (id) => {
    const { name, email, password, roles } = await req.json();
    const updateFields: Partial<{
      name: string;
      email: string;
      password?: string;
      roles: string[];
    }> = {
      name,
      email,
      roles,
      ...(password && { password: await bcrypt.hash(password, 10) }),
    };

    const updatedUser = await User.findByIdAndUpdate(id, updateFields, {
      new: true,
    }).select('-password');
    return updatedUser
      ? NextResponse.json(
          { message: 'User updated', user: updatedUser },
          { status: 200 }
        )
      : NextResponse.json({ error: 'User not found' }, { status: 404 });
  });
}

// Delete user
export async function DELETE(
  req: Request,
  context: { params: { id: string } }
): Promise<NextResponse> {
  return handleUserRequest(context, async (id) => {
    const deletedUser = await User.findByIdAndDelete(id);
    return deletedUser
      ? NextResponse.json({ message: 'User deleted' }, { status: 200 })
      : NextResponse.json({ error: 'User not found' }, { status: 404 });
  });
}
