// src/app/api/stats/route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/libs/mongodb';
import User from '@/models/user';
import Message from '@/models/message';
import Project from '@/models/project';
import Experience from '@/models/experience';
import StatSnapshot from '@/models/statSnapshot';

// GET: Return live stats and recent trend snapshots
export async function GET() {
  try {
    await connectToDatabase();

    // Live stats
    const [users, onlineUsers, messages, projects, experiences] =
      await Promise.all([
        User.countDocuments(),
        User.countDocuments({ isOnline: true }),
        Message.countDocuments(),
        Project.countDocuments(),
        Experience.countDocuments(),
      ]);

    // Latest 7 trend snapshots for graphs
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
        trends: snapshots.reverse(), // oldest first
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching live stats and trends:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// POST: Create daily snapshot if it doesn't exist yet
export async function POST() {
  try {
    await connectToDatabase();

    const [users, onlineUsers, messages, projects, experiences] =
      await Promise.all([
        User.countDocuments(),
        User.countDocuments({ isOnline: true }),
        Message.countDocuments(),
        Project.countDocuments(),
        Experience.countDocuments(),
      ]);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existing = await StatSnapshot.findOne({ date: today });
    if (existing) {
      return NextResponse.json({
        message: 'Snapshot already exists for today',
      });
    }

    const snapshot = await StatSnapshot.create({
      date: today,
      users,
      onlineUsers,
      messages,
      projects,
      experiences,
    });

    return NextResponse.json({ message: 'Snapshot created', snapshot });
  } catch (error) {
    console.error('Error creating snapshot:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
