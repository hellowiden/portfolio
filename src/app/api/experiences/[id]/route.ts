// src/app/api/experiences/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { connectToDatabase } from '@/libs/mongodb';
import Experience from '@/models/experience';

// Use explicit type for Next.js context
interface Context {
  params: { id: string };
}

// ✅ Fixed GET handler
export async function GET(req: NextRequest, { params }: Context) {
  try {
    const { id } = params;
    console.log('Experience ID:', id);

    if (!id) {
      return NextResponse.json({ error: 'No id provided' }, { status: 400 });
    }

    await connectToDatabase();
    const experience = await Experience.findById(id);

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

// ✅ Fixed PUT handler
export async function PUT(req: NextRequest, { params }: Context) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token || !token.roles.includes('admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const { id } = params;
    const body = await req.json();

    const updatedExperience = await Experience.findByIdAndUpdate(id, body, {
      new: true,
    });

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

// ✅ Fixed DELETE handler
export async function DELETE(req: NextRequest, { params }: Context) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token || !token.roles.includes('admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const { id } = params;

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
