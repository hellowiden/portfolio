// src/app/api/stats/route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/libs/mongodb';
import User from '@/models/user';
import Message from '@/models/message';
import Project from '@/models/project';
import Experience from '@/models/experience';
import StatSnapshot from '@/models/statSnapshot';

export async function GET(): Promise<NextResponse> {
  try {
    await connectToDatabase();

    // Current live stats
    const [users, onlineUsers, messages, projects, experiences] =
      await Promise.all([
        User.countDocuments(),
        User.countDocuments({ isOnline: true }),
        Message.countDocuments(),
        Project.countDocuments(),
        Experience.countDocuments(),
      ]);

    // Trend snapshots for graphing
    const snapshots = await StatSnapshot.find().sort({ date: -1 }).limit(7);

    return NextResponse.json(
      {
        liveStats: {
          users,
          onlineUsers,
          messages,
          projects,
          experiences,
        },
        trends: snapshots.reverse(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching live stats and trends:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
