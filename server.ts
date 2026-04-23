import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import { createServer as createViteServer } from "vite";
import { Server } from "socket.io";
import { createServer } from "http";
import authRoutes from "./src/api/auth";
import resourceRoutes from "./src/api/resources";
import questionRoutes from "./src/api/questions";
import userRoutes from "./src/api/users";
import messageRoutes from "./src/api/messages";

async function startServer() {
  const app = express();
  const PORT = 3000;
  
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  // Handle Socket.IO connections
  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);
    
    socket.on("join", (userId) => {
       socket.join(userId);
       console.log(`User ${userId} joined their personal room`);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  // Make io accessible in requests
  app.use((req: any, res, next) => {
    req.io = io;
    next();
  });

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Connect to DB if URI exists
  if (process.env.MONGODB_URI) {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('Connected to MongoDB');
    } catch (err) {
      console.error('MongoDB connection error:', err);
    }
  } else {
    console.warn('MONGODB_URI environment variable is not defined. Running without Database connection.');
  }

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });
  
  app.use("/api/auth", authRoutes);
  app.use("/api/resources", resourceRoutes);
  app.use("/api/questions", questionRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/messages", messageRoutes);

  // Global Error Handler
  app.use((err: any, req: any, res: any, next: any) => {
    console.error("Global Error Handler:", err);
    if (res.headersSent) {
      return next(err);
    }
    res.status(500).json({ 
      message: "Internal Server Error", 
      error: process.env.NODE_ENV === "production" ? {} : err.message 
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production serving (static files in dist directory)
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // The express.js catch-all for SPA client routing
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
