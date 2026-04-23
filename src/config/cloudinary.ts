import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

// Cloudinary automatically picks up process.env.CLOUDINARY_URL if it exists.
// We only need to configure it explicitly if that isn't provided.
if (!process.env.CLOUDINARY_URL) {
  cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
  });
}

export default cloudinary;
