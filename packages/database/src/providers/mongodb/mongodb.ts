// src/libs/mongodb.ts

import mongoose from 'mongoose';

/* eslint-disable no-var */
declare global {
  var _mongooseCache:
    | {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
      }
    | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI as string;
const DB_NAME = process.env.DB_NAME || 'portfolio';

if (!MONGODB_URI) {
  throw new Error('Missing MONGODB_URI environment variable.');
}

// Initialize global cache or reuse existing
const globalCache =
  globalThis._mongooseCache ??
  (globalThis._mongooseCache = { conn: null, promise: null });

export async function connectToDatabase() {
  if (globalCache.conn) return globalCache.conn;

  if (!globalCache.promise) {
    globalCache.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: DB_NAME,
        bufferCommands: false,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
      })
      .then((mongooseInstance) => {
        console.log('MongoDB connected');
        return mongooseInstance;
      })
      .catch((error) => {
        console.error('MongoDB connection error:', error);
        throw new Error('Failed to connect to database.');
      });
  }

  globalCache.conn = await globalCache.promise;
  return globalCache.conn;
}

export async function disconnectFromDatabase() {
  if (globalCache.conn) {
    await mongoose.disconnect();
    globalCache.conn = null;
    globalCache.promise = null;
    console.log('MongoDB disconnected');
  }
}
