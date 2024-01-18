"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const archive_controller_1 = require("../controller/archive.controller");
const ensure_multipart_1 = __importDefault(require("../middleware/ensure_multipart"));
const multer_1 = require("../middleware/multer");
const router = (0, express_1.Router)();
router.post("/", ensure_multipart_1.default, multer_1.upload.single("file"), archive_controller_1.respondAfterUpload);
router.get("/", (req, res, next) => {
    (0, archive_controller_1.listS3Files)(req, res, next).catch(next);
});
exports.default = router;
