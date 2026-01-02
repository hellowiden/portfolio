// src/app/api/experiences/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { connectToDatabase } from '@portfolio/lib/mongodb';
import Experience from '@portfolio/lib/models/experience';

// Centralized error response function
function errorResponse(message: string, status: number): NextResponse {
  return NextResponse.json({ error: message }, { status });
}

/** GET `/api/experiences` → Fetch all experiences */
export async function GET(): Promise<NextResponse> {
  try {
    await connectToDatabase();
    const experiences = await Experience.find().sort({ date: -1 });
    return NextResponse.json({ experiences }, { status: 200 });
  } catch (error) {
    console.error('Error fetching experiences:', error);
    return errorResponse('Server error', 500);
  }
}

/** POST `/api/experiences` → Create a new experience */
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    await connectToDatabase();

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token || !token.roles.includes('admin'))
      return errorResponse('Unauthorized', 401);

    const { title, location, description, date, image, tags, type } =
      await req.json();
    if (!title || !location || !description || !date || !type)
      return errorResponse('Missing required fields', 400);

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
    return errorResponse('Server error', 500);
  }
}
