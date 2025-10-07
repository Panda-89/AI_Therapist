import express from "express";
import {
  createChatSession,
  getChatSession,
  sendMessage,
  getChatHistory,
  getAllChatSessions,
} from "../controllers/chat";
import { auth } from "../middleware/auth";

const router = express.Router();

// Apply auth middleware to all routes
router.use(auth);

// In routes/chat.ts
router.get("/sessions", getAllChatSessions);

// Create a new chat session
router.post("/sessions", createChatSession);

// Get a specific chat session
router.get("/sessions/:sessionId", getChatSession);

// Send a message in a chat session
router.post("/sessions/:sessionId/messages", sendMessage);

// Get chat history for a session
router.get("/sessions/:sessionId/history", getChatHistory);

export default router;

// let response = pm.response.json()
// pm.globals.set("access_token", response.access_token)