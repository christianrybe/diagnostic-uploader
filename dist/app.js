"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/first */
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load environment variables from before initializing the app
const routes_1 = require("./routes");
const error_handler_1 = __importDefault(require("./middleware/error_handler"));
const app = (0, express_1.default)();
app.use("/api/archive", routes_1.ArchiveRoute);
app.use("/health", routes_1.HealthRoute);
app.use(error_handler_1.default);
// Export app for testing
exports.default = app;
