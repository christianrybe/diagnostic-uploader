"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tgz_archive_filter_1 = __importDefault(require("../tgz_archive_filter"));
describe("tgzArchiveFilter", () => {
    it("should process the upload if the file extension is .tgz", () => {
        const req = {};
        const file = {
            originalname: "archive.tgz",
        };
        const cb = jest.fn();
        (0, tgz_archive_filter_1.default)(req, file, cb);
        expect(cb).toHaveBeenCalledWith(null, true);
    });
    it("should throw an error if the file extension is not .tgz", () => {
        const req = {};
        const file = {
            originalname: "archive.zip",
        };
        const cb = jest.fn();
        (0, tgz_archive_filter_1.default)(req, file, cb);
        expect(cb).toHaveBeenCalledWith(new Error("Only .tgz archives are allowed"));
    });
});
