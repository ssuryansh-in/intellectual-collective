// @ts-nocheck
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { Resource } from "../models/Resource";
import { v2 as cloudinary } from "cloudinary";
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";
import { OAuth2Client } from "google-auth-library";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "default_jwt_secret_for_development_only";

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
});

// Google OAuth URL Generation
router.get("/google/url", (req, res) => {
  const redirectUri = req.query.redirectUri as string;
  const intent = req.query.intent as string; // 'login' or 'register'

  const stateData = Buffer.from(JSON.stringify({ r: redirectUri, i: intent })).toString('base64');

  const oAuth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    redirectUri
  );

  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'],
    state: stateData, 
  });

  res.json({ url: authUrl });
});

// Google OAuth Callback
router.get("/google/callback", async (req, res) => {
  try {
    const { code, state } = req.query;
    
    let redirectUri = '';
    let intent = '';
    try {
      if (state) {
        const decodedStr = Buffer.from(state as string, 'base64').toString('ascii');
        const parsed = JSON.parse(decodedStr);
        redirectUri = parsed.r;
        intent = parsed.i;
      }
    } catch(e) {
      // Fallback
      redirectUri = state as string;
    }

    const oAuth2Client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      redirectUri
    );

    const { tokens } = await oAuth2Client.getToken(code as string);
    oAuth2Client.setCredentials(tokens);

    const ticket = await oAuth2Client.verifyIdToken({
      idToken: tokens.id_token!,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
    if (!payload) throw new Error("Invalid Google Payload");

    const { email, name, sub: googleId } = payload;

    // Check if user exists
    let user = await User.findOne({ email });
    
    if (user) {
      if (intent === 'register') {
        res.send(`
          <html><body>
            <script>
              window.opener.postMessage({ type: 'OAUTH_AUTH_ERROR', message: 'An account with this email already exists. Please log in instead.' }, '*');
              window.close();
            </script>
          </body></html>
        `);
        return;
      }
      if (!user.googleId) {
         // Merge account if it was an email registration but they are logging in via google now
         user.googleId = googleId;
         user.isVerified = true;
         await user.save();
      }
    } else {
      if (intent === 'login') {
         res.send(`
          <html><body>
            <script>
              window.opener.postMessage({ type: 'OAUTH_AUTH_ERROR', message: 'No account found with this email. Please create an account.' }, '*');
              window.close();
            </script>
          </body></html>
        `);
        return;
      }
      
      // Register them instantly
      user = new User({
        fullName: name,
        email,
        googleId,
        isVerified: true // OAuth implies verified
      });
      await user.save();
    }

    // Sign token
    const jwtPayload = { user: { id: user.id } };
    const token = jwt.sign(jwtPayload, JWT_SECRET, { expiresIn: '72h' });

    // Send back UI snippet that closes itself and passes tokens
    const userPayloadJson = JSON.stringify({ 
      id: user.id, 
      fullName: user.fullName, 
      email: user.email, 
      interest: user.interest,
      skillsOffered: user.skillsOffered || [],
      skillsSought: user.skillsSought || []
    });
    
    res.send(`
      <html>
        <body>
          <script>
            if (window.opener) {
              window.opener.postMessage({ type: 'OAUTH_AUTH_SUCCESS', token: '${token}', user: ${userPayloadJson} }, '*');
              window.close();
            } else {
              window.location.href = '/dashboard';
            }
          </script>
          <p>Authentication successful. Redirecting...</p>
        </body>
      </html>
    `);
  } catch (error) {
    console.error(error);
    res.status(500).send("Authentication Error");
  }
});

// Verify Email Link
router.get("/verify", async (req, res) => {
  try {
    const { token } = req.query;
    const user = await User.findOne({ verificationToken: token });
    
    if (!user) {
      return res.status(400).send("Invalid or expired verification link.");
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.send(`
      <html><body>
        <h2 style="font-family:sans-serif; text-align:center; margin-top:50px;">Email Verified Successfully!</h2>
        <p style="font-family:sans-serif; text-align:center;">You may now close this tab and sign in.</p>
      </body></html>
    `);
  } catch(error) {
    res.status(500).send("Server Error");
  }
});

// Register
router.post("/register", async (req, res) => {
  try {
    const { fullName, email, interest, password } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists." });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const verificationToken = uuidv4();

    // Create user
    const newUser = new User({
      fullName,
      email,
      interest,
      password: hashedPassword,
      verificationToken,
      isVerified: false
    });

    await newUser.save();

    // Fire & Forget email dispatch
    const origin = req.headers.origin || req.protocol + '://' + req.headers.host;
    const verifyLink = `${origin}/api/auth/verify?token=${verificationToken}`;
    
    if (process.env.SMTP_USER && process.env.SMTP_PASSWORD) {
       transporter.sendMail({
         from: process.env.SMTP_USER,
         to: email,
         subject: "Verify Your Intellectual Collective Account",
         html: `
           <div style="font-family: sans-serif; padding: 20px;">
             <h2>Welcome to The Intellectual Collective!</h2>
             <p>Please verify your email address to unlock your account and begin collaborating.</p>
             <a href="${verifyLink}" style="display: inline-block; padding: 10px 20px; background-color: #00488d; color: white; text-decoration: none; border-radius: 5px;">Verify Email</a>
             <p style="margin-top:20px; font-size: 12px; color: #666;">If you didn't request this, ignore this email.</p>
           </div>
         `
       }).catch(err => console.error("SMTP Error", err));
       res.json({ status: "pending_verification", message: "Registration successful. Please check your email to verify your account." });
    } else {
       // Auto-verify fallback if no SMTP configured for preview
       console.warn("No SMTP keys configured, auto-verifying user!");
       newUser.isVerified = true;
       await newUser.save();
       
       const jwtPayload = { user: { id: newUser.id } };
       const token = jwt.sign(jwtPayload, JWT_SECRET, { expiresIn: '72h' });
       res.json({ token, user: { 
         id: newUser.id, 
         fullName: newUser.fullName, 
         email: newUser.email, 
         interest: newUser.interest,
         skillsOffered: newUser.skillsOffered || [],
         skillsSought: newUser.skillsSought || [],
         savedResources: newUser.savedResources || []
       } });
    }

  } catch (error: any) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    
    if (!user.isVerified) {
       return res.status(403).json({ message: "Please verify your email before logging in. Check your inbox." });
    }
    if (!user.password) {
       return res.status(400).json({ message: "This account was created with Google. Please 'Continue with Google'." });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create JWT payload
    const payload = {
      user: {
        id: user.id
      }
    };

    // Sign token
    jwt.sign(
      payload,
      JWT_SECRET,
      { expiresIn: '72h' },
      (err, token) => {
        if (err || !token) {
          console.error("JWT sign error:", err);
          return res.status(500).json({ message: "Error generating token" });
        }
        res.json({ token, user: { 
          id: user.id, 
          fullName: user.fullName, 
          email: user.email, 
          interest: user.interest,
          skillsOffered: user.skillsOffered || [],
          skillsSought: user.skillsSought || [],
          savedResources: user.savedResources || []
        } });
      }
    );
  } catch (error: any) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// Get Current User Profile (for refreshing local stats)
router.get("/me", async (req: any, res: any) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "No token, authorization denied" });
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const user = await User.findById(decoded.user.id).select("-password -verificationToken");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update User Profile
router.put("/me", async (req: any, res: any) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "No token, authorization denied" });
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = (decoded as any).user.id;

    const { fullName, skillsOffered, skillsSought } = req.body;
    if (!fullName) {
      return res.status(400).json({ message: "Full name is required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.fullName = fullName;
    if (skillsOffered !== undefined) user.skillsOffered = skillsOffered;
    if (skillsSought !== undefined) user.skillsSought = skillsSought;
    
    await user.save();

    res.json({ id: user.id, fullName: user.fullName, email: user.email, interest: user.interest, skillsOffered: user.skillsOffered, skillsSought: user.skillsSought, upvotes: user.upvotes, downvotes: user.downvotes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete User Account
router.delete("/me", async (req: any, res: any) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "No token, authorization denied" });
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = (decoded as any).user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete all resources authored by user
    const userResources = await Resource.find({ uploader: userId });
    for (const res of userResources) {
      if (res.cloudinaryId) {
        await cloudinary.uploader.destroy(res.cloudinaryId);
      }
      await res.deleteOne();
    }

    await user.deleteOne();
    res.json({ message: "User account and resources deleted permanently" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
