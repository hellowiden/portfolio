// src/app/api/projects/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { connectToDatabase } from '@portfolio/lib/mongodb';
import Project from '@portfolio/lib/models/project';

function errorResponse(message: string, status: number): NextResponse {
  return NextResponse.json({ error: message }, { status });
}

const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-GB').format(date);
};

/** GET `/api/projects` → Fetch all projects */
export async function GET(): Promise<NextResponse> {
  try {
    await connectToDatabase();
    const projects = await Project.find().sort({ createdAt: -1 });
    return NextResponse.json({ projects }, { status: 200 });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return errorResponse('Server error', 500);
  }
}

/** POST `/api/projects` → Create a new project */
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    await connectToDatabase();

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token || !token.roles.includes('admin'))
      return errorResponse('Unauthorized', 401);

    const { name, createdAt, completedAt, description, image, link, tags } =
      await req.json();
    if (!name || !createdAt || !description)
      return errorResponse('Missing required fields', 400);

    const newProject = await Project.create({
      name,
      createdAt: createdAt || formatDate(new Date()),
      completedAt,
      description,
      image,
      link,
      tags,
    });

    return NextResponse.json(
      { message: 'Project created', project: newProject },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating project:', error);
    return errorResponse('Server error', 500);
  }
}
