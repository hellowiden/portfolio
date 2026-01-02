// src/models/experience.ts
import mongoose from 'mongoose';

export interface IExperience extends mongoose.Document {
  title: string;
  location: string;
  description: string;
  date: string;
  image: string;
  tags: string[];
  type: 'work' | 'education';
  createdAt: Date;
  updatedAt: Date;
}

const ExperienceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: '',
    },
    tags: {
      type: [String],
      default: [],
    },
    type: {
      type: String,
      enum: ['work', 'education'],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Experience =
  mongoose.models.Experience ||
  mongoose.model<IExperience>('Experience', ExperienceSchema);

export default Experience;
