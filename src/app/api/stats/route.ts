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
    const stats = await StatSnapshot.find().sort({ date: -1 }).limit(7);
    return NextResponse.json({ stats }, { status: 200 });
  } catch (error) {
    console.error('Error fetching trend stats:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(): Promise<NextResponse> {
  try {
    await connectToDatabase();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let snapshot = await StatSnapshot.findOne({ date: today });

    if (!snapshot) {
      const users = await User.countDocuments();
      const onlineUsers = await User.countDocuments({ isOnline: true });
      const messages = await Message.countDocuments();
      const projects = await Project.countDocuments();
      const experiences = await Experience.countDocuments();

      snapshot = await StatSnapshot.create({
        date: today,
        users,
        onlineUsers,
        messages,
        projects,
        experiences,
      });
    }

    const stats = await StatSnapshot.find().sort({ date: -1 }).limit(7);
    return NextResponse.json({
      message: 'Snapshot updated or already exists',
      snapshot,
      stats,
    });
  } catch (error) {
    console.error('Error creating snapshot:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
