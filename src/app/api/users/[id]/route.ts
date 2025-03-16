//src/app/api/users/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '@/models/user';
import { connectToDatabase } from '@/libs/mongodb';

// Helper function to connect and get params (Next.js 14+ requires awaiting params)
async function getParams(context: { params: Promise<{ id: string }> }) {
  await connectToDatabase();
  return await context.params;
}

// Centralized error response function
function errorResponse(message: string, status: number): NextResponse {
  return NextResponse.json({ error: message }, { status });
}

/** GET `/api/users/[id]` → Fetch a user by ID */
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const { id } = await getParams(context);
    if (!id) return errorResponse('User ID is required', 400);

    const user = await User.findById(id).select('-password');
    if (!user) return errorResponse('User not found', 404);

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error('Error fetching user:', error);
    return errorResponse('Server error', 500);
  }
}

/** PUT `/api/users/[id]` → Update an existing user */
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const { id } = await getParams(context);
    if (!id) return errorResponse('User ID is required', 400);

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
    if (!updatedUser) return errorResponse('User not found', 404);

    return NextResponse.json(
      { message: 'User updated', user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating user:', error);
    return errorResponse('Server error', 500);
  }
}

/** DELETE `/api/users/[id]` → Delete a user */
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const { id } = await getParams(context);
    if (!id) return errorResponse('User ID is required', 400);

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) return errorResponse('User not found', 404);

    return NextResponse.json({ message: 'User deleted' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting user:', error);
    return errorResponse('Server error', 500);
  }
}
