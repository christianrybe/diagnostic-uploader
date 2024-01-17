"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("./app"));
describe("GET /health", () => {
    it("should return status 200 and a JSON response", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get("/health");
        expect(response.status).toBe(200);
        expect(response.type).toBe("application/json");
        expect(response.body).toEqual({
            status: "healthy",
            uptime: expect.any(Number),
            timestamp: expect.any(String),
        });
    }));
});
describe("POST /api/archives", () => {
    it("should return status 201 and a success message", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post("/api/archives").attach("file", "path/to/file");
        expect(response.status).toBe(201);
        expect(response.type).toBe("application/json");
        expect(response.body).toEqual({
            status: "success",
            message: "File uploaded successfully",
        });
    }));
});
