"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bad_request_error_1 = __importDefault(require("../error/bad-request-error"));
const multer_1 = __importDefault(require("multer"));
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    let response;
    if (err instanceof bad_request_error_1.default) {
        response = {
            error: {
                message: err.message,
                code: err.statusCode,
            },
        };
        res.status(err.statusCode).json(response);
    }
    else if (err instanceof multer_1.default.MulterError) {
        response = {
            error: {
                message: err.message,
                code: 400,
            },
        };
        res.status(400).json(response);
    }
    else {
        response = {
            error: {
                message: err.message,
                code: 500,
            },
        };
        res.status(500).json(response);
    }
};
exports.default = errorHandler;
