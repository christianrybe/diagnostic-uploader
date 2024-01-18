"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const archive_controller_1 = __importDefault(require("../controller/archive.controller"));
const ensure_multipart_1 = __importDefault(require("../middleware/ensure_multipart"));
const multer_1 = require("../middleware/multer");
const router = (0, express_1.Router)();
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
router.post("/", ensure_multipart_1.default, multer_1.upload.single("file"), archive_controller_1.default);
exports.default = router;
