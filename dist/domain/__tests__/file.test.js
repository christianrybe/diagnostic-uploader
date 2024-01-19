"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const file_1 = require("../file");
describe("maxUploadSizeOrFiftyGB", () => {
    it("should return the value of MAX_UPLOAD_SIZE environment variable if it's defined", () => {
        process.env.MAX_UPLOAD_SIZE = "10000000000";
        expect((0, file_1.getMaxUploadSizeOrDefault)()).toBe(10000000000);
    });
    it("should return 50GB in bytes if MAX_UPLOAD_SIZE environment variable is not defined", () => {
        delete process.env.MAX_UPLOAD_SIZE;
        const bytesToGBMultiplier = 1000 * 1000 * 1000;
        expect((0, file_1.getMaxUploadSizeOrDefault)()).toBe(50000000000);
        expect((0, file_1.getMaxUploadSizeOrDefault)()).toBe(50 * bytesToGBMultiplier);
    });
});
describe("generateResourceName", () => {
    it("should return a string that starts with a timestamp and ends with the original name", () => {
        const originalName = "test.tgz";
        const resourceName = (0, file_1.generateResourceName)(originalName);
        expect(resourceName).toMatch(new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z-${originalName}$`));
    });
});
describe("verifyFileExtension", () => {
    it("should return true if the file has a .tgz extension", () => {
        expect((0, file_1.verifyFileExtension)("test.tgz")).toBe(true);
    });
    it("should return false if the file does not have a .tgz extension", () => {
        expect((0, file_1.verifyFileExtension)("test.txt")).toBe(false);
    });
});
describe("verifyMultipartContentType", () => {
    it("should return true if the content type starts with multipart/form-data", () => {
        expect((0, file_1.verifyMultipartContentType)("multipart/form-data; boundary=something")).toBe(true);
    });
    it("should return false if the content type does not start with multipart/form-data", () => {
        expect((0, file_1.verifyMultipartContentType)("application/json")).toBe(false);
    });
    it("should return false if the content type is undefined", () => {
        expect((0, file_1.verifyMultipartContentType)(undefined)).toBe(false);
    });
});
