//libs/mongodb.tsx

import mongoose from 'mongoose';

let isConnected = false;

export async function connectToDatabase() {
  if (isConnected) {
    console.log('Using existing MongoDB connection.');
    return mongoose.connection;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is required.');
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.DB_NAME || 'portfolio',
      bufferCommands: false,
    });

    isConnected = mongoose.connection.readyState === 1;
    console.log('Connected to MongoDB.');
    return mongoose.connection;
  } catch (error) {
    console.error('MongoDB connection error:', (error as Error).message);
    throw new Error('Database connection failed.');
  }
}
