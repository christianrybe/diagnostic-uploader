import express, { type Application } from "express";
import dotenv from "dotenv";

// Dotenv config must be called before importing multer
// eslint-disable-file import/first
import { ArchiveRoute, HealthRoute } from "./routes";
import errorHandler from "./middleware/error_handler";
dotenv.config();

const app: Application = express();

app.use("/api/archive", ArchiveRoute);

app.use("/health", HealthRoute);

app.use(errorHandler);

// Export app for testing
export default app;
