// @ts-nocheck
import express from "express";
import multer from "multer";
import jwt from "jsonwebtoken";
import { Question } from "../models/Question";
import { Answer } from "../models/Answer";
import cloudinary from "../config/cloudinary";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "default_jwt_secret_for_development_only";

// Auth Middleware
const authMiddleware = (req: any, res: any, next: any) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "No token, authorization denied" });
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = (decoded as any).user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Get all questions (Supports searching and filtering)
router.get("/", authMiddleware, async (req: any, res: any) => {
  try {
    const { tab, search } = req.query;
    let dbQuery: any = {};

    // Handles the search input text
    if (search) {
      dbQuery.$or = [
        { title: { $regex: search, $options: "i" } },
        { body: { $regex: search, $options: "i" } },
        { subject: { $regex: search, $options: "i" } }
      ];
    }

    // Handles tab filtering
    if (tab === "my") {
      dbQuery.author = req.user.id;
    } else if (tab === "unanswered") {
      dbQuery.answerCount = { $eq: 0 };
    }

    const questions = await Question.find(dbQuery)
      .populate("author", "fullName reputation")
      .lean();

    // Custom sorting: top net score questions appear at the top, followed by date
    questions.sort((a, b) => {
       const scoreA = (a.upvotes || 0) - (a.downvotes || 0);
       const scoreB = (b.upvotes || 0) - (b.downvotes || 0);
       if (scoreA !== scoreB) return scoreB - scoreA;
       return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); // Newest first for ties
    });

    res.json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get a single question with its answers
router.get("/:id", async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).populate("author", "fullName reputation");
    if (!question) return res.status(404).json({ message: "Question not found" });

    const answers = await Answer.find({ question: req.params.id })
      .populate("author", "fullName reputation")
      .lean();

    // Sort heavily by net score (upvotes - downvotes), then by date
    answers.sort((a, b) => {
       const scoreA = (a.upvotes || 0) - (a.downvotes || 0);
       const scoreB = (b.upvotes || 0) - (b.downvotes || 0);
       if (scoreA !== scoreB) return scoreB - scoreA;
       return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });

    res.json({ question, answers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Ask a new question (with optional image)
router.post("/", authMiddleware, upload.single("image"), async (req: any, res: any) => {
  try {
    const { title, body, subject } = req.body;
    if (!title || !body || !subject) {
       return res.status(400).json({ message: "Title, body, and subject are required" });
    }

    let imageUrl = null;
    let cloudinaryId = null;

    if (req.file) {
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      const dataURI = "data:" + req.file.mimetype + ";base64," + b64;
      const cldRes = await cloudinary.uploader.upload(dataURI, {
        resource_type: "auto",
        folder: "peerlearn_questions",
      });
      imageUrl = cldRes.secure_url;
      cloudinaryId = cldRes.public_id;
    }

    const newQuestion = new Question({
      title,
      body,
      subject,
      imageUrl,
      cloudinaryId,
      author: req.user.id
    });

    await newQuestion.save();
    
    // Return populated author so UI can display immediately
    const populatedQ = await Question.findById(newQuestion._id).populate("author", "fullName reputation").lean();
    res.json({ ...populatedQ, answerCount: 0 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Add an answer (with optional file)
router.post("/:id/answers", authMiddleware, upload.single("file"), async (req: any, res: any) => {
  try {
    const { body } = req.body;
    if (!body) return res.status(400).json({ message: "Answer body is required" });

    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ message: "Question not found" });

    let imageUrl = null;
    let fileUrl = null;
    let fileName = null;
    let cloudinaryId = null;

    if (req.file) {
      if (req.file.size > 25 * 1024 * 1024) {
         return res.status(400).json({ message: "File exceeds 25MB limit" });
      }

      const b64 = Buffer.from(req.file.buffer).toString("base64");
      const dataURI = "data:" + req.file.mimetype + ";base64," + b64;
      const cldRes = await cloudinary.uploader.upload(dataURI, {
        resource_type: "auto",
        folder: "peerlearn_answers",
      });

      if (req.file.mimetype.startsWith("image/")) {
        imageUrl = cldRes.secure_url;
      } else {
        fileUrl = cldRes.secure_url;
        fileName = req.file.originalname;
      }
      cloudinaryId = cldRes.public_id;
    }

    const newAnswer = new Answer({
      body,
      imageUrl,
      fileUrl,
      fileName,
      cloudinaryId,
      author: req.user.id,
      question: req.params.id
    });

    await newAnswer.save();
    
    // Increment the question's answer count
    question.answerCount += 1;
    await question.save();

    res.json(newAnswer);
  } catch (error: any) {
    console.error("Answer upload failure:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
});

// Vote on a Question
router.post("/:id/vote", authMiddleware, async (req: any, res: any) => {
  try {
    const { action } = req.body; // 'up', 'down', or 'none'
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ message: "Question not found" });

    const userIdStr = req.user.id;
    
    // Remove user from both arrays
    question.upvotedBy = question.upvotedBy.filter((id: any) => id.toString() !== userIdStr);
    question.downvotedBy = question.downvotedBy.filter((id: any) => id.toString() !== userIdStr);

    if (action === 'up') {
      question.upvotedBy.push(userIdStr);
    } else if (action === 'down') {
      question.downvotedBy.push(userIdStr);
    }

    question.upvotes = question.upvotedBy.length;
    question.downvotes = question.downvotedBy.length;
    await question.save();

    res.json({ upvotes: question.upvotes, downvotes: question.downvotes, upvotedBy: question.upvotedBy, downvotedBy: question.downvotedBy });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Vote on an Answer
router.post("/:id/answers/:answerId/vote", authMiddleware, async (req: any, res: any) => {
  try {
    const { action } = req.body; // 'up', 'down', or 'none'
    const answer = await Answer.findById(req.params.answerId);
    if (!answer) return res.status(404).json({ message: "Answer not found" });
    if (answer.question.toString() !== req.params.id) return res.status(400).json({ message: "Answer doesn't belong to this question" });

    const userIdStr = req.user.id;
    
    // Remove user from both arrays
    answer.upvotedBy = answer.upvotedBy.filter((id: any) => id.toString() !== userIdStr);
    answer.downvotedBy = answer.downvotedBy.filter((id: any) => id.toString() !== userIdStr);

    if (action === 'up') {
      answer.upvotedBy.push(userIdStr);
    } else if (action === 'down') {
      answer.downvotedBy.push(userIdStr);
    }

    answer.upvotes = answer.upvotedBy.length;
    answer.downvotes = answer.downvotedBy.length;
    await answer.save();

    res.json({ upvotes: answer.upvotes, downvotes: answer.downvotes, upvotedBy: answer.upvotedBy, downvotedBy: answer.downvotedBy });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Accept an Answer
router.put("/:id/answers/:answerId/accept", authMiddleware, async (req: any, res: any) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ message: "Question not found" });

    // Only original poster can accept
    if (question.author.toString() !== req.user.id) {
       return res.status(403).json({ message: "Only the author of the question can accept an answer" });
    }

    const answer = await Answer.findById(req.params.answerId);
    if (!answer) return res.status(404).json({ message: "Answer not found" });
    if (answer.question.toString() !== req.params.id) return res.status(400).json({ message: "Answer doesn't belong to this question" });

    // Un-accept any other answers (optional, but typical for SO-like behavior, OP can change their minds)
    await Answer.updateMany({ question: req.params.id }, { isAccepted: false });

    // Mark this one as accepted
    answer.isAccepted = true;
    await answer.save();

    res.json({ message: "Answer accepted", answer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
