"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = require("../multer");
describe("tgzArchiveFilter", () => {
    it("should process the upload if the file extension is .tgz", () => {
        const req = {};
        const file = {
            originalname: "archive.tgz",
        };
        const cb = jest.fn();
        (0, multer_1.tgzArchiveFilter)(req, file, cb);
        expect(cb).toHaveBeenCalledWith(null, true);
    });
    it("should throw an error if the file extension is not .tgz", () => {
        const req = {};
        const file = {
            originalname: "archive.zip",
        };
        const cb = jest.fn();
        (0, multer_1.tgzArchiveFilter)(req, file, cb);
        expect(cb).toHaveBeenCalledWith(new Error("Only .tgz archives are allowed"));
    });
});
