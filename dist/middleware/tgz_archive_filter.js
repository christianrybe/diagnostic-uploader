"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bad_request_error_1 = __importDefault(require("../error/bad-request-error"));
const file_1 = require("../domain/file");
function tgzArchiveFilter(req, file, cb) {
    if ((0, file_1.verifyFileExtension)(file.originalname)) {
        cb(null, true);
    }
    else {
        cb(new bad_request_error_1.default("Only .tgz archives are allowed"));
    }
}
exports.default = tgzArchiveFilter;
