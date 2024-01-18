"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bad_request_error_1 = __importDefault(require("../error/bad-request-error"));
const ensureFileSizeLimit = (req, res, next) => {
    var _a;
    const contentTypeHeader = (_a = req.headers["content-type"]) !== null && _a !== void 0 ? _a : "";
    if (contentTypeHeader.startsWith("multipart/form-data")) {
        next();
    }
    else {
        next(new bad_request_error_1.default("File size limit exceeded"));
    }
};
