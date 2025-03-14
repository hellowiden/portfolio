// src/app/api/experiences/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { connectToDatabase } from '@/libs/mongodb';
import Experience from '@/models/experience';

/** GET /api/experiences */
export async function GET() {
  try {
    await connectToDatabase();
    const experiences = await Experience.find().sort({ date: -1 });
    return NextResponse.json({ experiences }, { status: 200 });
  } catch (error) {
    console.error('Error fetching experiences:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

/** POST /api/experiences */
export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token || !token.roles.includes('admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const body = await req.json();
    const { title, location, description, date, image, tags, type } = body;

    if (!title || !location || !description || !date || !type) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newExperience = await Experience.create({
      title,
      location,
      description,
      date,
      image,
      tags,
      type,
    });

    return NextResponse.json(
      { message: 'Experience created', experience: newExperience },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating experience:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
