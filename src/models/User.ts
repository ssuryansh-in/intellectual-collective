import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String, // optional for Google users
  },
  interest: {
    type: String, // optional for Google users
  },
  googleId: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
  },
  reputation: {
    type: Number,
    default: 0,
  },
  skillsOffered: {
    type: [String],
    default: [],
  },
  skillsSought: {
    type: [String],
    default: [],
  },
  blockedUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  savedResources: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resource",
  }],
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
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
