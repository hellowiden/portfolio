// src/models/project.ts
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProject extends Document {
  name: string;
  description: string;
  image?: string;
  link?: string;
  tags: string[];
  createdAt: string;
  completedAt?: string;
}

const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-GB').format(date);
};

const ProjectSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Project name is required'],
      trim: true,
      minlength: [3, 'Project name must be at least 3 characters'],
      maxlength: [100, 'Project name cannot exceed 100 characters'],
      index: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      minlength: [10, 'Description must be at least 10 characters'],
    },
    image: {
      type: String,
      validate: {
        validator: function (v: string) {
          return (
            !v || /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp))$/.test(v)
          );
        },
        message: 'Invalid image URL format',
      },
    },
    link: {
      type: String,
      validate: {
        validator: function (v: string) {
          return !v || /^(https?:\/\/[^\s]+)$/.test(v);
        },
        message: 'Invalid link format',
      },
    },
    tags: {
      type: [String],
      default: [],
      validate: {
        validator: function (tags: string[]) {
          return tags.every((tag) => typeof tag === 'string' && tag.length > 0);
        },
        message: 'Tags must be an array of non-empty strings',
      },
    },
    createdAt: {
      type: String,
      default: () => formatDate(new Date()),
    },
    completedAt: {
      type: String,
      validate: {
        validator: function (v: string) {
          return !v || /^\d{2}-\d{2}-\d{4}$/.test(v);
        },
        message: 'completedAt must be in DD-MM-YYYY format',
      },
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

ProjectSchema.index({ name: 1, createdAt: -1 });

const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);

export default Project;
