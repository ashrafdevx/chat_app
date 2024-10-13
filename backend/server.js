import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import messageRoute from "./routes/message.routes.js";
import path from "path";
import dbConnection from "./db/dbconnection.js";
import cookieParser from "cookie-parser";

// Varaibles
const app = express();
const PORT = process.env.PORT || 3000;
const dirname = path.resolve();
// Config
dotenv.config();
app.use(cookieParser());

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoute);
app.use(express.static(path.join(dirname, "frontend/build")));
console.log("Path", dirname);
app.get("*", (req, res) => {
  res.sendFile(dirname, "frontend", "build", "index.html");
});
app.listen(PORT, () => {
  dbConnection();
  console.log(`Server running on port ${PORT}`);
});
