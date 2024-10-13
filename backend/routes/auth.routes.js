import express from "express";
import { logOut, SignIn, signUp } from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/signin", SignIn);
router.post("/signup", signUp);
router.get("/logout", logOut);

export default router;
