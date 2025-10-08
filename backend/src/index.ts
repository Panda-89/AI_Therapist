const express = require('express')

import {serve} from "inngest/express";
import {inngest } from "./inngest/index";
import { Request, Response } from "express";
import { functions as inngestFunctions } from "./inngest/functions";
import { logger } from "./utils/logger";
import { connectDB } from "./utils/db";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRouter from "./routes/auth";
import { errorHandler } from "./middleware/errorHandler";
import chatRouter from "./routes/chat";
import moodRouter from "./routes/mood";
import activityRouter from "./routes/activity";

dotenv.config();

const app = express();

const allowedOrigins = [
    "https://ai-therapist-one-wheat.vercel.app",
    "https://ai-therapist-nm2emihex-panda-89s-projects.vercel.app",
    "https://ai-therapist-git-main-panda-89s-projects.vercel.app"
  ];
  

//middleware
app.use(cors({
    origin: function(origin, callback) {
      if (!origin) return callback(null, true); // allow Postman, server-side requests, etc.
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
  }));
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/inngest", serve({ client: inngest, functions: inngestFunctions }));


app.use("/auth", authRouter);
app.use("/chat", chatRouter);
app.use("/api/mood", moodRouter);
app.use("/api/activity", activityRouter);

app.use(errorHandler);

const startServer = async () => {
    try {
        await connectDB();
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            logger.info(`Server is running on port ${PORT}`);
            logger.info(
                `Inngest endpoint available at http://localhost:${PORT}/api/inngest`
            );
        });
    } catch (error) {
        logger.error("Failed to start server:", error);
        process.exit(1);
    }
};

app.get("/", (req: Request, res: Response) => {
    res.send("AI Therapist backend is running successfully 🚀");
  });

startServer();
