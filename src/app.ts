import express, { type Request, type Response, type Application } from "express";
import dotenv from "dotenv";
dotenv.config();

// Dotenv config must be called before importing multer
// eslint-disable-next-line import/first
import { upload } from "./multer";

const app: Application = express();
const port = process.env.PORT ?? 8000;

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
app.post("/api/upload", upload.single("file"), (req: Request, res: Response) => {
  res.send("File uploaded successfully");
});

app.listen(port, () => {
  console.log(`Server online at http://localhost:${port}`);
});
