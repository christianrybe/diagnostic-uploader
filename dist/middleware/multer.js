"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const tgz_archive_filter_1 = __importDefault(require("./tgz_archive_filter"));
const aws_1 = require("./aws");
const bucketName = process.env.AWS_BUCKET_NAME;
if (bucketName === undefined) {
    throw new Error("Missing bucket name in environment variables");
}
const storage = (0, multer_s3_1.default)({
    s3: aws_1.s3Client,
    bucket: bucketName,
    key: function (req, file, cb) {
        const resourceName = file.originalname + "-" + new Date().toISOString();
        req.resourceName = resourceName; // pass the resource name back to the API
        cb(null, resourceName);
    },
});
const twentyFiveGB = 25000000000;
exports.upload = (0, multer_1.default)({ limits: { fileSize: twentyFiveGB }, storage, fileFilter: tgz_archive_filter_1.default });
