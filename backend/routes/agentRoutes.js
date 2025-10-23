import express from "express";
import { createAgent, listAgents } from "../controllers/agentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Route: POST /api/agents => Create new agent (Admin only)
router.post("/", protect, createAgent);

// Route: GET /api/agents => Fetch all agents
router.get("/", protect, listAgents);

export default router;
