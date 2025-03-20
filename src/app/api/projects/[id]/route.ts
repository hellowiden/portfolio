// src/app/api/projects/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { connectToDatabase } from '@/libs/mongodb';
import Project from '@/models/project';

async function getParams(context: { params: Promise<{ id: string }> }) {
  await connectToDatabase();
  return await context.params;
}

async function authenticateAdmin(
  req: NextRequest
): Promise<NextResponse | null> {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token || !token.roles.includes('admin'))
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return null;
}

function errorResponse(message: string, status: number): NextResponse {
  return NextResponse.json({ error: message }, { status });
}

/** GET `/api/projects/[id]` → Fetch a project by ID */
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const { id } = await getParams(context);
    if (!id) return errorResponse('No ID provided', 400);

    const project = await Project.findById(id);
    if (!project) return errorResponse('Project not found', 404);

    return NextResponse.json({ project }, { status: 200 });
  } catch (error) {
    console.error('Error retrieving project:', error);
    return errorResponse('Server error', 500);
  }
}

/** PUT `/api/projects/[id]` → Update an existing project */
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const authResponse = await authenticateAdmin(req);
    if (authResponse) return authResponse;

    const { id } = await getParams(context);
    if (!id) return errorResponse('No ID provided', 400);

    const { name, createdAt, completedAt, description, image, link, tags } =
      await req.json();
    if (!name || !createdAt || !description)
      return errorResponse('Missing required fields', 400);

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { name, createdAt, completedAt, description, image, link, tags },
      { new: true }
    );

    if (!updatedProject) return errorResponse('Project not found', 404);
    return NextResponse.json(
      { message: 'Project updated', project: updatedProject },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating project:', error);
    return errorResponse('Server error', 500);
  }
}

/** DELETE `/api/projects/[id]` → Delete a project */
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const authResponse = await authenticateAdmin(req);
    if (authResponse) return authResponse;

    const { id } = await getParams(context);
    if (!id) return errorResponse('No ID provided', 400);

    const deletedProject = await Project.findByIdAndDelete(id);
    if (!deletedProject) return errorResponse('Project not found', 404);

    return NextResponse.json({ message: 'Project deleted' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting project:', error);
    return errorResponse('Server error', 500);
  }
}
