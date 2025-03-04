import mongoose from 'mongoose';

// Define the User interface
export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  roles: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Define the User schema
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: {
      type: [String],
      enum: ['user', 'admin'],
      default: ['user'],
    },
  },
  {
    timestamps: true,
  }
);

// Create or retrieve the model
const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
