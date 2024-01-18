import express, { type Request, type Response, type Application } from "express";
import dotenv from "dotenv";
dotenv.config();

// Dotenv config must be called before importing multer
// eslint-disable-next-line import/first
import { upload } from "./multer";

const app: Application = express();

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
app.post("/api/archives", upload.single("file"), (req: Request, res: Response) => {
  res.status(201).json({
    status: "success",
    message: "File uploaded successfully",
    resourceName: req.resourceName,
  });
});

// Export app for testing
export default app;
