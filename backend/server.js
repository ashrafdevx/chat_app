import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import messageRoute from "./routes/message.routes.js";
import userRoute from "./routes/user.routes.js";
import path from "path";
import dbConnection from "./db/dbconnection.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./socket/socket.js";
//ENV contastant

const PORT = process.env.PORT || 5000;
const dirname = path.resolve();
// Config
dotenv.config();

// Middelware
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://chat-app-mu-ecru.vercel.app/"],
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
  })
);
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoute);
app.use("/api/user", userRoute);

// app.use(express.static(path.join(dirname, "frontend/build")));
app.use(express.static(path.join(dirname, "frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(dirname, "frontend", "build", "index.html"));
});

// PORT Server
server.listen(PORT, () => {
  dbConnection();
  console.log(`Server running on port ${PORT}`);
});
