// src/app/api/experiences/[id]/route.ts
import { connectToDatabase, Experience } from '@portfolio/database';
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

interface AuthToken {
  id: string;
  name: string;
  email: string;
  roles?: string[];
}

// Helper function to get params (Next.js 14+ requires awaiting params)
async function getParams(context: { params: Promise<{ id: string }> }) {
  await connectToDatabase();
  return await context.params;
}

// Helper function for admin authentication
async function authenticateAdmin(
  req: NextRequest
): Promise<NextResponse | null> {
  const token = (await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })) as AuthToken | null;
  if (!token || !token.roles?.includes('admin'))
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return null;
}

// Centralized error response function
function errorResponse(message: string, status: number): NextResponse {
  return NextResponse.json({ error: message }, { status });
}

/** GET `/api/experiences/[id]` → Fetch an experience by ID */
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const { id } = await getParams(context);
    if (!id) return errorResponse('No ID provided', 400);

    const experience = await Experience.findById(id);
    if (!experience) return errorResponse('Experience not found', 404);

    return NextResponse.json({ experience }, { status: 200 });
  } catch (error) {
    console.error('Error fetching experience:', error);
    return errorResponse('Server error', 500);
  }
}

/** PUT `/api/experiences/[id]` → Update an existing experience */
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const authResponse = await authenticateAdmin(req);
    if (authResponse) return authResponse;

    const { id } = await getParams(context);
    if (!id) return errorResponse('No ID provided', 400);

    const { title, location, description, date, image, tags, type } =
      await req.json();
    const updatedExperience = await Experience.findByIdAndUpdate(
      id,
      { title, location, description, date, image, tags, type },
      { new: true }
    );

    if (!updatedExperience) return errorResponse('Experience not found', 404);
    return NextResponse.json(
      { message: 'Experience updated', experience: updatedExperience },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating experience:', error);
    return errorResponse('Server error', 500);
  }
}

/** DELETE `/api/experiences/[id]` → Delete an experience */
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const authResponse = await authenticateAdmin(req);
    if (authResponse) return authResponse;

    const { id } = await getParams(context);
    if (!id) return errorResponse('No ID provided', 400);

    const deletedExperience = await Experience.findByIdAndDelete(id);
    if (!deletedExperience) return errorResponse('Experience not found', 404);

    return NextResponse.json(
      { message: 'Experience deleted' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting experience:', error);
    return errorResponse('Server error', 500);
  }
}
