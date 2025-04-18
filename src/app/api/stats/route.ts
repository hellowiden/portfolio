// src/app/api/stats/route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/libs/mongodb';
import StatSnapshot from '@/models/statSnapshot';

export async function GET(): Promise<NextResponse> {
  try {
    await connectToDatabase();
    const stats = await StatSnapshot.find().sort({ date: -1 }).limit(7);
    return NextResponse.json({ stats }, { status: 200 });
  } catch (error) {
    console.error('Error fetching trend stats:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
