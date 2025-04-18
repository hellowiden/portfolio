// utils/captureStats.ts
import { connectToDatabase } from '@/libs/mongodb';
import StatSnapshot from '@/models/statSnapshot';
import User from '@/models/user';
import Project from '@/models/project';
import Message from '@/models/message';
import Experience from '@/models/experience';

export async function captureStatsSnapshot() {
  await connectToDatabase();

  const users = await User.find();
  const messages = await Message.find();
  const projects = await Project.find();
  const experiences = await Experience.find();
  const onlineUsers = await User.countDocuments({ isOnline: true });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  await StatSnapshot.findOneAndUpdate(
    { date: today },
    {
      users: users.length,
      onlineUsers,
      messages: messages.length,
      projects: projects.length,
      experiences: experiences.length,
    },
    { upsert: true, new: true }
  );
}
