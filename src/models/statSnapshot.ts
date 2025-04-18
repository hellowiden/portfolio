// models/statSnapshot.ts
import mongoose, { Schema } from 'mongoose';

const StatSnapshotSchema = new Schema(
  {
    date: { type: Date, required: true, unique: true },
    users: Number,
    onlineUsers: Number,
    messages: Number,
    projects: Number,
    experiences: Number,
  },
  { timestamps: true }
);

export default mongoose.models.StatSnapshot ||
  mongoose.model('StatSnapshot', StatSnapshotSchema);
