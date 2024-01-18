"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bad_request_error_1 = __importDefault(require("../../error/bad-request-error"));
const ensure_multipart_1 = __importDefault(require("../ensure_multipart"));
describe("ensureMultipart middleware", () => {
    let req;
    let res;
    let next;
    beforeEach(() => {
        req = {};
        res = {};
        next = jest.fn();
    });
    it("should process request if Content-Type is multipart/form-data", () => {
        req.headers = { "content-type": "multipart/form-data" };
        (0, ensure_multipart_1.default)(req, res, next);
        expect(next).toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith();
    });
    it("should return BadRequestError if Content-Type is not multipart/form-data", () => {
        req.headers = { "content-type": "application/json" };
        (0, ensure_multipart_1.default)(req, res, next);
        expect(next).toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith(new bad_request_error_1.default("Invalid request: Content-Type should be multipart/form-data"));
    });
});
