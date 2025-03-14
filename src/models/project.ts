// src/models/project.ts
import mongoose from 'mongoose';

export interface IProject extends mongoose.Document {
  name: string;
  date: string;
  description: string;
  image: string;
  link?: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    date: {
      type: Date, // 2025-03-14
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: '',
    },
    link: {
      type: String,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Project =
  mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);

export default Project;
