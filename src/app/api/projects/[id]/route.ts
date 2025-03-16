// src/app/api/projects/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { connectToDatabase } from '@/libs/mongodb';
import Project from '@/models/project';

// Helper function to connect and get ID from params
async function getParams(context: { params: Promise<{ id: string }> }) {
  await connectToDatabase();
  return await context.params;
}

// Helper function for admin authentication
async function authenticateAdmin(
  req: NextRequest
): Promise<NextResponse | null> {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token || !token.roles.includes('admin')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}

/** GET /api/projects/[id] */
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const { id } = await getParams(context);
    if (!id)
      return NextResponse.json({ error: 'No ID provided' }, { status: 400 });

    const project = await Project.findById(id);
    if (!project)
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });

    return NextResponse.json({ project }, { status: 200 });
  } catch (error) {
    console.error('Error retrieving project:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

/** PUT /api/projects/[id] */
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const authResponse = await authenticateAdmin(req);
    if (authResponse) return authResponse;

    const { id } = await getParams(context);
    if (!id)
      return NextResponse.json({ error: 'No ID provided' }, { status: 400 });

    // Update project
    const { name, date, description, image, link, tags } = await req.json();
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { name, date, description, image, link, tags },
      { new: true }
    );

    if (!updatedProject)
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });

    return NextResponse.json(
      { message: 'Project updated', project: updatedProject },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

/** DELETE /api/projects/[id] */
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const authResponse = await authenticateAdmin(req);
    if (authResponse) return authResponse;

    const { id } = await getParams(context);
    if (!id)
      return NextResponse.json({ error: 'No ID provided' }, { status: 400 });

    const deletedProject = await Project.findByIdAndDelete(id);
    if (!deletedProject)
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });

    return NextResponse.json({ message: 'Project deleted' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
