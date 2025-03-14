// src/app/api/projects/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { connectToDatabase } from '@/libs/mongodb';
import Project from '@/models/project';

export async function GET() {
  try {
    await connectToDatabase();
    const projects = await Project.find().sort({ date: -1 });
    return NextResponse.json({ projects }, { status: 200 });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token || !token.roles.includes('admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const body = await req.json();
    const { name, date, description, image, link, tags } = body;

    if (!name || !date || !description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newProject = await Project.create({
      name,
      date,
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
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
