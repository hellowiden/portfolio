// src/app/api/projects/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { connectToDatabase } from '@/libs/mongodb';
import Project from '@/models/project';

// Dynamic route context interface
interface ProjectsRouteContext {
  params: {
    id: string;
  };
}

/** GET /api/projects/[id] */
export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    // Parse `/api/projects/<id>` manually
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop(); // or a more robust parser if needed

    if (!id) {
      return NextResponse.json({ error: 'No ID provided' }, { status: 400 });
    }

    const project = await Project.findById(id);
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    return NextResponse.json({ project }, { status: 200 });
  } catch (error) {
    console.error('Error retrieving project:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

/** PUT /api/projects/[id] */
export async function PUT(
  req: NextRequest,
  context: ProjectsRouteContext | Promise<ProjectsRouteContext>
) {
  const ctx = await context;
  const { id } = ctx.params;

  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token || !token.roles.includes('admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const body = await req.json();
    const { name, date, description, image, link, tags } = body;

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { name, date, description, image, link, tags },
      { new: true }
    );

    if (!updatedProject) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
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
  context: ProjectsRouteContext | Promise<ProjectsRouteContext>
) {
  const ctx = await context;
  const { id } = ctx.params;

  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token || !token.roles.includes('admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Project deleted' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
