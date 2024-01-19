"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyMultipartContentType = exports.verifyFileExtension = exports.generateResourceName = exports.maxUploadSizeOrFiftyGB = exports.getMaxUploadSizeOrDefault = void 0;
const path_1 = __importDefault(require("path"));
const fiftyGB = 50000000000;
// Exported for tests
const getMaxUploadSizeOrDefault = () => (process.env.MAX_UPLOAD_SIZE ? Number(process.env.MAX_UPLOAD_SIZE) : fiftyGB);
exports.getMaxUploadSizeOrDefault = getMaxUploadSizeOrDefault;
exports.maxUploadSizeOrFiftyGB = (0, exports.getMaxUploadSizeOrDefault)();
const generateResourceName = (originalName) => {
    return new Date().toISOString() + "-" + originalName;
};
exports.generateResourceName = generateResourceName;
const acceptedFileExtensions = [".tgz"];
const verifyFileExtension = (originalName) => {
    const ext = path_1.default.extname(originalName).toLowerCase();
    return acceptedFileExtensions.includes(ext);
};
exports.verifyFileExtension = verifyFileExtension;
const verifyMultipartContentType = (contentTypeHeader) => {
    return !!(contentTypeHeader === null || contentTypeHeader === void 0 ? void 0 : contentTypeHeader.startsWith("multipart/form-data"));
};
exports.verifyMultipartContentType = verifyMultipartContentType;
