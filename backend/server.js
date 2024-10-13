import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import messageRoute from "./routes/message.routes.js";
import userRoute from "./routes/user.routes.js";
import path from "path";
import dbConnection from "./db/dbconnection.js";
import cookieParser from "cookie-parser";

//ENV contastant
const app = express();
const PORT = process.env.PORT || 5000;
const dirname = path.resolve();
// Config
dotenv.config();

// Middelware
app.use(cookieParser());
app.use(express.json());
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoute);
app.use("/api/user", userRoute);

app.use(express.static(path.join(dirname, "frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(dirname, "frontend", "build", "index.html");
});

// PORT Server
app.listen(PORT, () => {
  dbConnection();
  console.log(`Server running on port ${PORT}`);
});
