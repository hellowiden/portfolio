//src/models/message.ts
import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    message: { type: String, required: true, trim: true },
    budget: {
      type: String,
      enum: ['under_100', '100_500', '500_1000', '1000_plus'],
      default: null,
    },
    reason: {
      type: String,
      enum: ['job_offer', 'issues', 'general'],
      default: null,
    },
    response: { type: String, default: '' },
    isResolved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Message =
  mongoose.models.Message || mongoose.model('Message', MessageSchema);
export default Message;
