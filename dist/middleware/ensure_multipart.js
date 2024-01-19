"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bad_request_error_1 = __importDefault(require("../error/bad-request-error"));
const file_1 = require("../domain/file");
const ensureMultipart = (req, res, next) => {
    if ((0, file_1.verifyMultipartContentType)(req.headers["content-type"])) {
        next();
    }
    else {
        next(new bad_request_error_1.default("Invalid request: Content-Type should be multipart/form-data"));
    }
};
exports.default = ensureMultipart;
