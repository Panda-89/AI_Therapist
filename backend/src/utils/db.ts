import mongoose from 'mongoose';
import { logger } from './logger';

const MONGODB_URL = process.env.MONGODB_URL || 
"mongodb+srv://worksarvagya45_db_user:HegniyYOxi6MezlT@ai-therapy-agent.yu7peqa.mongodb.net/?retryWrites=true&w=majority&appName=ai-therapy-agent ";

export const connectDB = async () => {
    try {
      await mongoose.connect(MONGODB_URL);
      logger.info("Connected to MongoDB Atlas");
    } catch (error) {
      logger.error("MongoDB connection error:", error);
      process.exit(1);
    }
  };