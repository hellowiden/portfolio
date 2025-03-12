//src/libs/mongodb.ts

import mongoose from 'mongoose';

let isConnected = false; // Global connection state

export async function connectToDatabase() {
  if (isConnected) return mongoose.connection;

  if (!process.env.MONGODB_URI) {
    throw new Error('Missing MONGODB_URI environment variable.');
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.DB_NAME || 'portfolio',
      bufferCommands: true, // Allow queries to be queued until connected
    });

    isConnected = db.connection.readyState === 1;
    return db.connection;
  } catch (error) {
    throw new Error(`Database connection failed: ${(error as Error).message}`);
  }
}
