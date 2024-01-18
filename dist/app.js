"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Dotenv config must be called before importing multer
// eslint-disable-next-line import/first
const multer_1 = require("./multer");
const app = (0, express_1.default)();
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "healthy",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
    });
});
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
app.post("/api/archives", multer_1.upload.single("file"), (req, res) => {
    res.status(201).json({
        status: "success",
        message: "File uploaded successfully",
        resourceName: req.resourceName,
    });
});
// Export app for testing
exports.default = app;
