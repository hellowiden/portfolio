// src/app/api/experiences/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { connectToDatabase } from '@/libs/mongodb';
import Experience from '@/models/experience';

// Define the type for the params object
interface ExperienceParams {
  id: string;
}

export async function GET(
  req: NextRequest,
  context: { params: Promise<ExperienceParams> }
): Promise<NextResponse> {
  try {
    const { id } = await context.params;
    console.log('Experience ID:', id);

    if (!id) {
      return NextResponse.json({ error: 'No id provided' }, { status: 400 });
    }

    const experience = await Experience.findById(id);
    console.log('Experience found:', experience);

    if (!experience) {
      return NextResponse.json(
        { error: 'Experience not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ experience }, { status: 200 });
  } catch (error) {
    console.error('Error fetching experience:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<ExperienceParams> }
): Promise<NextResponse> {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token || !token.roles.includes('admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const { id } = await context.params;
    const body = await req.json();
    const { title, location, description, date, image, tags, type } = body;

    const updatedExperience = await Experience.findByIdAndUpdate(
      id,
      { title, location, description, date, image, tags, type },
      { new: true }
    );

    if (!updatedExperience) {
      return NextResponse.json(
        { error: 'Experience not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Experience updated', experience: updatedExperience },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating experience:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<ExperienceParams> }
): Promise<NextResponse> {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token || !token.roles.includes('admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const { id } = await context.params;

    const deletedExperience = await Experience.findByIdAndDelete(id);
    if (!deletedExperience) {
      return NextResponse.json(
        { error: 'Experience not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Experience deleted' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting experience:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
