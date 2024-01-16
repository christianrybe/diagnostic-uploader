"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const client_s3_1 = require("@aws-sdk/client-s3");
aws_sdk_1.default.config.update({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: process.env.AWS_REGION,
});
const s3 = new client_s3_1.S3Client();
console.log("secretAccessKey", process.env.AWS_SECRET_ACCESS_KEY);
const storage = (0, multer_s3_1.default)({
    s3,
    bucket: "diagnostics-easy-to-remember-string-test-env",
    key: function (req, file, cb) {
        cb(null, file.originalname + "-" + new Date().toISOString());
    },
});
exports.upload = (0, multer_1.default)({ storage });
