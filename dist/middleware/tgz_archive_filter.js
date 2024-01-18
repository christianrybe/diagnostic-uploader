"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const bad_request_error_1 = __importDefault(require("../error/bad-request-error"));
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
exports.default = tgzArchiveFilter;
