"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArchiveRoute = exports.HealthRoute = void 0;
var metrics_routes_1 = require("./metrics.routes");
Object.defineProperty(exports, "HealthRoute", { enumerable: true, get: function () { return __importDefault(metrics_routes_1).default; } });
var archive_routes_1 = require("./archive.routes");
Object.defineProperty(exports, "ArchiveRoute", { enumerable: true, get: function () { return __importDefault(archive_routes_1).default; } });
