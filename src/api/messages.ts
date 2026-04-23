// @ts-nocheck
import express from "express";
import jwt from "jsonwebtoken";
import { Message } from "../models/Message";
import { User } from "../models/User";
import { ConnectionRequest } from "../models/ConnectionRequest";

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

// Get chat history with a specific user
router.get("/:otherUserId", authMiddleware, async (req: any, res: any) => {
  try {
    const myId = req.user.id;
    const otherId = req.params.otherUserId;

    // Security Check: Blocked?
    const me = await User.findById(myId);
    const other = await User.findById(otherId);
    if (!other) return res.status(404).json({ message: "User not found" });

    if ((me.blockedUsers && me.blockedUsers.includes(otherId)) || 
        (other.blockedUsers && other.blockedUsers.includes(myId))) {
      return res.status(403).json({ message: "Access denied due to user restrictions." });
    }

    const messages = await Message.find({
      $or: [
        { senderId: myId, recipientId: otherId },
        { senderId: otherId, recipientId: myId }
      ]
    }).sort({ createdAt: 1 }).lean();

    // Mark messages from otherId to myId as read
    await Message.updateMany(
      { senderId: otherId, recipientId: myId, read: false },
      { $set: { read: true } }
    );

    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Send a message
router.post("/:otherUserId", authMiddleware, async (req: any, res: any) => {
  try {
    const myId = req.user.id;
    const otherId = req.params.otherUserId;
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ message: "Message text is required" });
    }

    // Security Check 1: Blocked?
    const me = await User.findById(myId);
    const other = await User.findById(otherId);
    if (!other) return res.status(404).json({ message: "Recipient not found" });

    if ((me.blockedUsers && me.blockedUsers.includes(otherId)) || 
        (other.blockedUsers && other.blockedUsers.includes(myId))) {
      return res.status(403).json({ message: "You cannot message this user due to blocks." });
    }

    // Security Check 2: Accepted Connection?
    const connection = await ConnectionRequest.findOne({
      $or: [
        { sender: myId, recipient: otherId },
        { sender: otherId, recipient: myId }
      ],
      status: 'accepted'
    });

    if (!connection) {
      return res.status(403).json({ message: "You must be connected to send messages." });
    }

    const newMessage = new Message({
      senderId: myId,
      recipientId: otherId,
      text: text.trim()
    });

    await newMessage.save();

    // Broadcast message via Socket.IO directly to the recipient's personal room
    if (req.io) {
      req.io.to(otherId).emit("receive_message", newMessage);
      req.io.to(myId).emit("receive_message", newMessage); // Echo back to sender for other open tabs
      
      // Also emit a notification if the recipient is not currently in the chat with me
      req.io.to(otherId).emit("notification", {
        type: "NEW_MESSAGE",
        senderName: me.fullName,
        senderId: myId,
        message: `New message from ${me.fullName}`
      });
    }

    res.status(201).json(newMessage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Mark messages as read
router.put("/:otherUserId/read", authMiddleware, async (req: any, res: any) => {
  try {
    const myId = req.user.id;
    const otherId = req.params.otherUserId;
    await Message.updateMany(
      { senderId: otherId, recipientId: myId, read: false },
      { $set: { read: true } }
    );
    res.json({ message: "Messages marked as read" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
