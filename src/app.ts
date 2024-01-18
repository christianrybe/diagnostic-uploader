/* eslint-disable import/first */
import express, { type Application } from "express";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables from before initializing the app

import { ArchiveRoute, HealthRoute } from "./routes";
import errorHandler from "./middleware/error_handler";

const app: Application = express();

app.use("/api/archive", ArchiveRoute);

app.use("/health", HealthRoute);

app.use(errorHandler);

// Export app for testing
export default app;
