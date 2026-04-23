import mongoose from "mongoose";

const ConnectionRequestSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

ConnectionRequestSchema.index({ sender: 1, recipient: 1 }, { unique: true });

export const ConnectionRequest = mongoose.models.ConnectionRequest || mongoose.model("ConnectionRequest", ConnectionRequestSchema);
