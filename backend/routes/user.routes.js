import express from "express";
import { UserRoutes } from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/", protectRoute, UserRoutes);

export default router;
