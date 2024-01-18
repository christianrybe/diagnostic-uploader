"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.tgzArchiveFilter = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const client_s3_1 = require("@aws-sdk/client-s3");
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const path_1 = __importDefault(require("path"));
const bad_request_error_1 = __importDefault(require("../error/bad-request-error"));
aws_sdk_1.default.config.update({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: process.env.AWS_REGION,
});
const s3 = new client_s3_1.S3Client();
const bucketName = process.env.AWS_BUCKET_NAME;
if (bucketName === undefined) {
    throw new Error("Missing bucket name in environment variables");
}
const storage = (0, multer_s3_1.default)({
    s3,
    bucket: bucketName,
    key: function (req, file, cb) {
        const resourceName = file.originalname + "-" + new Date().toISOString();
        req.resourceName = resourceName; // pass the resource name back to the API
        cb(null, resourceName);
    },
});
// Exported for tests
function tgzArchiveFilter(req, file, cb) {
    var _a;
    const originalName = (_a = file.originalname) !== null && _a !== void 0 ? _a : "";
    const ext = path_1.default.extname(originalName).toLowerCase();
    if (ext === ".tgz") {
        cb(null, true);
    }
    else {
        cb(new bad_request_error_1.default("Only .tgz archives are allowed"));
    }
}
exports.tgzArchiveFilter = tgzArchiveFilter;
const twentyFiveGB = 25000000000;
exports.upload = (0, multer_1.default)({ limits: { fileSize: twentyFiveGB }, storage, fileFilter: tgzArchiveFilter });
