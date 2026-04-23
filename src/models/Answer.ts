import mongoose from "mongoose";

const AnswerSchema = new mongoose.Schema({
  body: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  imageUrl: {
    type: String,
  },
  fileUrl: {
    type: String,
  },
  fileName: {
    type: String,
  },
  cloudinaryId: {
    type: String,
  },
  upvotes: {
    type: Number,
    default: 0,
  },
  downvotes: {
    type: Number,
    default: 0,
  },
  upvotedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  downvotedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  isAccepted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export const Answer = mongoose.models.Answer || mongoose.model("Answer", AnswerSchema);
