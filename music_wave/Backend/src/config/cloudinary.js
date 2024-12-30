import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();

const connectCloudinary = async () => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_SECRET_KEY,
        });
        console.log('Cloudinary connected successfully.');
    } catch (error) {
        console.error('Error connecting to Cloudinary:', error.message);
    }
};

export default connectCloudinary;

