import express from "express";
import { sendMessage } from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";
const router = express.Router();

router.post("/sent/:id", protectRoute, sendMessage);

export default router;
