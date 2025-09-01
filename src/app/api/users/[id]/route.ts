// src/app/api/users/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '@/models/user';
import { connectToDatabase } from '@/libs/mongodb';
import { getSession } from '@/libs/auth';
import type { Session } from 'next-auth';

// ---- helpers ---------------------------------------------------------------

function errorResponse(message: string, status: number): NextResponse {
  return NextResponse.json({ error: message }, { status });
}

type ParamsPromise = { params: Promise<{ id?: string }> };

async function getParams(context: ParamsPromise) {
  await connectToDatabase();
  return await context.params;
}

function isAdmin(session: Session): boolean {
  const roles = session.user?.roles ?? [];
  return Array.isArray(roles) && roles.includes('admin');
}

async function requireSession(): Promise<Session> {
  const session = await getSession();
  if (!session?.user?.id) throw new Response('Unauthorized', { status: 401 });
  return session;
}

/**
 * Resolve which user ID is being targeted.
 * - If param is "me" or empty => use session user id
 * - If param !== session user id and not admin => 403
 */
function resolveTargetUserId(
  paramId: string | undefined,
  session: Session
): string | Response {
  const selfId = session.user.id;
  const requestedId = !paramId || paramId === 'me' ? selfId : paramId;

  if (requestedId !== selfId && !isAdmin(session)) {
    return new Response('Forbidden', { status: 403 });
  }
  return requestedId;
}

// ---- GET /api/users/[id] ---------------------------------------------------

export async function GET(
  req: NextRequest,
  context: ParamsPromise
): Promise<NextResponse> {
  try {
    const session = await requireSession();
    const { id: paramId } = await getParams(context);

    const resolved = resolveTargetUserId(paramId, session);
    if (resolved instanceof Response) return errorResponse('Forbidden', 403);
    const id = resolved;

    const user = await User.findById(id).select('-password');
    if (!user) return errorResponse('User not found', 404);

    return NextResponse.json({ user }, { status: 200 });
  } catch (err) {
    if (err instanceof Response)
      return errorResponse(err.statusText, err.status);
    console.error('Error fetching user:', err);
    return errorResponse('Server error', 500);
  }
}

// ---- PUT /api/users/[id] ---------------------------------------------------

export async function PUT(
  req: NextRequest,
  context: ParamsPromise
): Promise<NextResponse> {
  try {
    const session = await requireSession();
    const { id: paramId } = await getParams(context);

    const resolved = resolveTargetUserId(paramId, session);
    if (resolved instanceof Response) return errorResponse('Forbidden', 403);
    const id = resolved;

    const body = await req.json();
    const {
      name,
      email,
      password,
      roles, // only admins can change this
      currentPassword, // required when self is changing their password
    }: {
      name?: string;
      email?: string;
      password?: string;
      roles?: string[];
      currentPassword?: string;
    } = body ?? {};

    const targetUser = await User.findById(id);
    if (!targetUser) return errorResponse('User not found', 404);

    const admin = isAdmin(session);

    // Roles guard: only admins may change roles
    if (typeof roles !== 'undefined' && !admin) {
      return errorResponse('Only admins can change roles', 403);
    }

    // Password guard for self-updates
    if (password && !admin) {
      if (!currentPassword)
        return errorResponse('Current password required', 400);
      const ok = await bcrypt.compare(currentPassword, targetUser.password);
      if (!ok) return errorResponse('Incorrect current password', 401);
    }

    const updateFields: Partial<{
      name: string;
      email: string;
      password: string;
      roles: string[];
    }> = {};

    if (typeof name !== 'undefined') updateFields.name = name;
    if (typeof email !== 'undefined') updateFields.email = email;
    if (typeof roles !== 'undefined' && admin) updateFields.roles = roles;
    if (password) updateFields.password = await bcrypt.hash(password, 10);

    if (Object.keys(updateFields).length === 0) {
      const fresh = await User.findById(id).select('-password');
      return NextResponse.json(
        { message: 'No changes', user: fresh },
        { status: 200 }
      );
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateFields, {
      new: true,
      runValidators: true,
    }).select('-password');

    return NextResponse.json(
      { message: 'User updated', user: updatedUser },
      { status: 200 }
    );
  } catch (err) {
    if (err instanceof Response)
      return errorResponse(err.statusText, err.status);
    console.error('Error updating user:', err);
    return errorResponse('Server error', 500);
  }
}

// ---- DELETE /api/users/[id] ------------------------------------------------

export async function DELETE(
  req: NextRequest,
  context: ParamsPromise
): Promise<NextResponse> {
  try {
    const session = await requireSession();
    const { id: paramId } = await getParams(context);

    const resolved = resolveTargetUserId(paramId, session);
    if (resolved instanceof Response) return errorResponse('Forbidden', 403);
    const id = resolved;

    const admin = isAdmin(session);
    const selfDelete = id === session.user.id;

    if (!admin && !selfDelete) {
      return errorResponse('Forbidden', 403);
    }

    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) return errorResponse('User not found', 404);

    return NextResponse.json({ message: 'User deleted' }, { status: 200 });
  } catch (err) {
    if (err instanceof Response)
      return errorResponse(err.statusText, err.status);
    console.error('Error deleting user:', err);
    return errorResponse('Server error', 500);
  }
}
