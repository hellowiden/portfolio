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
      enum: ['under_3000', '3000_4500', '4500_6000', '6000_8000', '8000_plus'],
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
