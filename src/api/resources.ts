// @ts-nocheck
import express from "express";
import multer from "multer";
import jwt from "jsonwebtoken";
import { Resource } from "../models/Resource";
import { User } from "../models/User";
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

// Helper to generate proxy URLs for resources
const signResourceUrls = (resources: any[]) => {
  return resources.map((r: any) => {
    const resObj = r.toObject();
    const ext = resObj.format ? `.${resObj.format}` : '';
    resObj.fileUrl = `/api/resources/serve/${resObj._id}/view${ext}`;
    return resObj;
  });
};

// Setup Multer memory storage (keeps file in memory stream for Cloudinary)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload a new resource
router.post("/upload", authMiddleware, upload.single("file"), async (req: any, res: any) => {
  console.log("Upload request received");
  try {
    if (!req.file) {
      console.error("No file in request");
      return res.status(400).json({ message: "No file uploaded" });
    }
    
    const { title, description, subject } = req.body;
    console.log("Upload metadata:", { title, subject });

    if (!title || !subject) {
      console.error("Missing title or subject");
      return res.status(400).json({ message: "Title and subject are required" });
    }

    // Upload to Cloudinary using an up-stream
    console.log("Starting Cloudinary stream upload...");
    const uploadStream = cloudinary.uploader.upload_stream(
      { 
        resource_type: "auto",
        folder: "peerlearn_resources",
        access_mode: "public",
        type: "upload"
      },
      async (error: any, result: any) => {
        console.log("Cloudinary callback triggered", { hasError: !!error, hasResult: !!result });
        try {
          if (error || !result) {
            console.error("Cloudinary error detail:", error);
            // Ensure we return a JSON response even if called from a callback
            if (!res.headersSent) {
              return res.status(500).json({ 
                message: "Cloudinary upload failed", 
                error: error?.message || "Unknown Cloudinary error"
              });
            }
            return;
          }
          
          console.log("Cloudinary upload success, saving to DB...", { resource_type: result.resource_type, format: result.format });
          // Save to Database
          const newResource = new Resource({
            title,
            description,
            subject,
            fileUrl: result.secure_url,
            cloudinaryId: result.public_id,
            resourceType: result.resource_type || "image",
            format: result.format,
            uploader: req.user.id
          });
          
          await newResource.save();
          console.log("Database save success");
          if (!res.headersSent) {
            res.json(newResource);
          }
        } catch (innerError: any) {
          console.error("Error in Cloudinary callback:", innerError);
          if (!res.headersSent) {
            res.status(500).json({ message: "Error saving resource to database", error: innerError.message });
          }
        }
      }
    );
    
    // Pipe buffer to stream
    uploadStream.end(req.file.buffer);
    
  } catch (error) {
    console.error("Upload route error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get currently logged-in user's uploads
router.get("/me", authMiddleware, async (req: any, res: any) => {
  try {
    const { search } = req.query;
    let query: any = { uploader: req.user.id };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { subject: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }

    const resources = await Resource.find(query)
      .populate("uploader", "fullName")
      .sort({ createdAt: -1 });
    res.json(signResourceUrls(resources));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get user's saved resources
router.get("/saved", authMiddleware, async (req: any, res: any) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: "savedResources",
      populate: { path: "uploader", select: "fullName" }
    });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Filter out nulls in case a resource was deleted
    let validResources = user.savedResources.filter((r: any) => r && r._id);

    res.json(signResourceUrls(validResources));
  } catch (error) {
    console.error("Error fetching saved resources:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Toggle save resource
router.post("/:id/save", authMiddleware, async (req: any, res: any) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const resourceId = req.params.id;
    const isSaved = user.savedResources.includes(resourceId);

    if (isSaved) {
      user.savedResources = user.savedResources.filter((id: any) => id.toString() !== resourceId);
    } else {
      user.savedResources.push(resourceId);
    }
    
    await user.save();
    
    // Also return updated user info to client
    const updatedUser = user.toObject();
    delete updatedUser.password;
    
    res.json({ saved: !isSaved, user: updatedUser });
  } catch (error) {
    console.error("Error toggling save resource:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all resources
router.get("/", async (req, res) => {
  try {
    const { search } = req.query;
    let query: any = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { subject: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }

    // Populate the uploader details so we can show who posted it
    const resources = await Resource.find(query).populate("uploader", "fullName").sort({ createdAt: -1 });
    res.json(signResourceUrls(resources));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a resource
router.delete("/:id", authMiddleware, async (req: any, res: any) => {
  try {
    const resource = await Resource.findById(req.params.id);
    
    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }

    // Ensure user owns the resource
    if (resource.uploader.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized to delete this resource" });
    }

    // Delete from Cloudinary if it has a cloudinaryId
    if (resource.cloudinaryId) {
      await cloudinary.uploader.destroy(resource.cloudinaryId, {
        resource_type: resource.resourceType || "image"
      });
    }

    // Delete from MongoDB
    await resource.deleteOne();

    res.json({ message: "Resource removed successfully" });
  } catch (error) {
    console.error("Delete resource error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Serve a resource file (Proxy to Cloudinary)
router.get("/serve/:id*", async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) return res.status(404).json({ message: "Resource not found" });

    // Generate a signed URL with a short expiration for the server-to-server fetch
    const publicIdWithExt = resource.format ? `${resource.cloudinaryId}.${resource.format}` : resource.cloudinaryId;
    const signedUrl = cloudinary.url(publicIdWithExt, {
      secure: true,
      resource_type: resource.resourceType || "image",
      sign_url: true,
      type: "upload"
    });

    const response = await fetch(signedUrl);
    
    if (!response.ok) {
       console.error(`Failed to fetch from Cloudinary: ${response.status} ${response.statusText}`);
       return res.status(response.status).send("Cloudinary fetch failed");
    }

    // Pass through headers
    res.setHeader('Content-Type', response.headers.get('Content-Type') || 'application/octet-stream');
    res.setHeader('Content-Disposition', `inline; filename="${resource.title}.${resource.format || 'bin'}"`);
    
    // Stream the body
    if (response.body) {
      // @ts-ignore
      const reader = response.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(value);
      }
      res.end();
    }
  } catch (error) {
    console.error("Serve route error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
