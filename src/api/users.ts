// @ts-nocheck
import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { User } from "../models/User";
import { ConnectionRequest } from "../models/ConnectionRequest";
import { Message } from "../models/Message";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";

// Auth Middleware
const authMiddleware = (req: any, res: any, next: any) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "No API token provided" });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = (decoded as any).user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Get Mutual Matches
router.get("/matches", authMiddleware, async (req: any, res: any) => {
  try {
    const currentUser = await User.findById(req.user.id);
    if (!currentUser) return res.status(404).json({ message: "User not found" });

    // A mutual match:
    // User B offers at least one skill User A seeks
    // User B seeks at least one skill User A offers
    
    // Only fetch matches if the user has filled out both fields
    if (!currentUser.skillsOffered || currentUser.skillsOffered.length === 0 || 
        !currentUser.skillsSought || currentUser.skillsSought.length === 0) {
      return res.json([]);
    }

    const matches = await User.find({
      _id: { $ne: currentUser._id, $nin: currentUser.blockedUsers || [] },
      blockedUsers: { $ne: currentUser._id }, // Don't show users who have blocked current user
      skillsOffered: { $in: currentUser.skillsSought },
      skillsSought: { $in: currentUser.skillsOffered }
    }).select("fullName interest email skillsOffered skillsSought upvotes downvotes").limit(50).lean();

    // Attach connection status to each match
    const requests = await ConnectionRequest.find({
      $or: [
        { sender: currentUser._id },
        { recipient: currentUser._id }
      ]
    }).lean();

    const matchesWithStatus = matches.map(m => {
      const rel = requests.find(r => 
        (r.sender.toString() === currentUser._id.toString() && r.recipient.toString() === m._id.toString()) ||
        (r.recipient.toString() === currentUser._id.toString() && r.sender.toString() === m._id.toString())
      );
      
      let connectionStatus = 'none';
      if (rel) {
        if (rel.status === 'accepted') connectionStatus = 'accepted';
        else if (rel.status === 'pending') {
          connectionStatus = rel.sender.toString() === currentUser._id.toString() ? 'sent_pending' : 'received_pending';
        }
      }
      
      return { ...m, connectionStatus };
    });

    res.json(matchesWithStatus);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Send/Handle Connection Request
router.post("/connect/:recipientId", authMiddleware, async (req: any, res: any) => {
  try {
    const senderId = req.user.id;
    const recipientId = req.params.recipientId;
    const { action } = req.body; // "request", "accept", "reject"

    const recipient = await User.findById(recipientId);
    if (!recipient) return res.status(404).json({ message: "User not found" });

    // Security: Check blocks
    const sender = await User.findById(senderId);
    if (sender.blockedUsers.includes(recipientId) || recipient.blockedUsers.includes(senderId)) {
      return res.status(403).json({ message: "Action not permitted due to user restrictions" });
    }

    if (action === 'request') {
      const existing = await ConnectionRequest.findOne({
        $or: [
          { sender: senderId, recipient: recipientId },
          { sender: recipientId, recipient: senderId }
        ]
      });

      if (existing) return res.status(400).json({ message: "Connection already exists or is pending" });

      const newRequest = new ConnectionRequest({ sender: senderId, recipient: recipientId });
      await newRequest.save();

      // Emit live notification
      if (req.io) {
        req.io.to(recipientId).emit("notification", {
          type: "CONNECT_REQUEST",
          senderName: sender.fullName,
          senderId: senderId,
          message: `${sender.fullName} wants to connect for studying!`
        });
      }

      return res.status(201).json(newRequest);
    } else if (action === 'accept' || action === 'reject') {
      const request = await ConnectionRequest.findOne({ sender: recipientId, recipient: senderId, status: 'pending' });
      if (!request) return res.status(404).json({ message: "Pending request not found" });

      if (action === 'accept') {
        request.status = 'accepted';
        await request.save();

        if (req.io) {
          req.io.to(recipientId).emit("notification", {
            type: "CONNECT_ACCEPTED",
            senderName: sender.fullName,
            senderId: senderId,
            message: `${sender.fullName} accepted your study request!`
          });
        }
      } else {
        await ConnectionRequest.deleteOne({ _id: request._id });
      }

      return res.json({ message: `Request ${action}ed` });
    }

    res.status(400).json({ message: "Invalid action" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Block User
router.post("/block/:userId", authMiddleware, async (req: any, res: any) => {
  try {
    const myId = req.user.id;
    const targetId = req.params.userId;

    const user = await User.findById(myId);
    if (!user.blockedUsers.includes(targetId)) {
      user.blockedUsers.push(targetId);
      await user.save();
    }

    // Delete any existing connection requests between them
    await ConnectionRequest.deleteMany({
      $or: [
        { sender: myId, recipient: targetId },
        { sender: targetId, recipient: myId }
      ]
    });

    res.json({ message: "User blocked successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get notification counts for badges
router.get("/notifications/status", authMiddleware, async (req: any, res: any) => {
  try {
    const userId = req.user.id;
    
    const pendingRequestsCount = await ConnectionRequest.countDocuments({
      recipient: userId,
      status: 'pending'
    });

    const unreadMessagesCount = await Message.countDocuments({
      recipientId: userId,
      read: false
    });

    // Optional: breakdown by sender
    const unreadByPeer = await Message.aggregate([
      { $match: { recipientId: new mongoose.Types.ObjectId(userId), read: false } },
      { $group: { _id: "$senderId", count: { $sum: 1 } } }
    ]);

    res.json({
      pendingRequestsCount,
      unreadMessagesCount,
      unreadByPeer: unreadByPeer.reduce((acc: any, curr: any) => {
        acc[curr._id] = curr.count;
        return acc;
      }, {})
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get Pending Requests
router.get("/requests", authMiddleware, async (req: any, res: any) => {
  try {
    const requests = await ConnectionRequest.find({ recipient: req.user.id, status: 'pending' })
      .populate("sender", "fullName interest skillsOffered reputation")
      .lean();
    res.json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Vote User (Upvote / Downvote)
router.post("/:id/vote", authMiddleware, async (req: any, res: any) => {
  try {
    const targetUser = await User.findById(req.params.id);
    if (!targetUser) return res.status(404).json({ message: "User not found" });

    const { action } = req.body; // "up" or "down"
    const userId = req.user.id;

    if (action === 'up') {
      if (targetUser.downvotedBy && targetUser.downvotedBy.includes(userId)) {
        targetUser.downvotedBy = targetUser.downvotedBy.filter((id: any) => id.toString() !== userId);
      }
      if (targetUser.upvotedBy && !targetUser.upvotedBy.includes(userId)) {
        targetUser.upvotedBy.push(userId);
      } else if (targetUser.upvotedBy) {
        targetUser.upvotedBy = targetUser.upvotedBy.filter((id: any) => id.toString() !== userId);
      }
    } else if (action === 'down') {
      if (targetUser.upvotedBy && targetUser.upvotedBy.includes(userId)) {
        targetUser.upvotedBy = targetUser.upvotedBy.filter((id: any) => id.toString() !== userId);
      }
      if (targetUser.downvotedBy && !targetUser.downvotedBy.includes(userId)) {
        targetUser.downvotedBy.push(userId);
      } else if (targetUser.downvotedBy) {
        targetUser.downvotedBy = targetUser.downvotedBy.filter((id: any) => id.toString() !== userId);
      }
    }

    targetUser.upvotes = targetUser.upvotedBy ? targetUser.upvotedBy.length : 0;
    targetUser.downvotes = targetUser.downvotedBy ? targetUser.downvotedBy.length : 0;
    targetUser.reputation = targetUser.upvotes - targetUser.downvotes;

    await targetUser.save();
    res.json({ upvotes: targetUser.upvotes, downvotes: targetUser.downvotes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Unblock User
router.post("/unblock/:userId", authMiddleware, async (req: any, res: any) => {
  try {
    const myId = req.user.id;
    const targetId = req.params.userId;
    const user = await User.findById(myId);
    if (user.blockedUsers) {
      user.blockedUsers = user.blockedUsers.filter((id: any) => id.toString() !== targetId);
    }
    await user.save();
    res.json({ message: "User unblocked" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get Blocked Users
router.get("/blocked", authMiddleware, async (req: any, res: any) => {
  try {
    const user = await User.findById(req.user.id).populate("blockedUsers", "fullName interest email").lean();
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user.blockedUsers || []);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get User Profile
router.get("/:id", authMiddleware, async (req: any, res: any) => {
    try {
        const targetUser = await User.findById(req.params.id).select("-password -verificationToken");
        if (!targetUser) return res.status(404).json({ message: "User not found" });
        res.json(targetUser);
    } catch(err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
