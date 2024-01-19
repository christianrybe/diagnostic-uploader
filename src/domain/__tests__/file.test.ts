import { getMaxUploadSizeOrDefault, generateResourceName, verifyFileExtension, verifyMultipartContentType } from "../file";

describe("maxUploadSizeOrFiftyGB", () => {
  it("should return the value of MAX_UPLOAD_SIZE environment variable if it's defined", () => {
    process.env.MAX_UPLOAD_SIZE = "10000000000";
    expect(getMaxUploadSizeOrDefault()).toBe(10000000000);
  });

  it("should return 50GB in bytes if MAX_UPLOAD_SIZE environment variable is not defined", () => {
    delete process.env.MAX_UPLOAD_SIZE;
    const bytesToGBMultiplier = 1000 * 1000 * 1000;
    expect(getMaxUploadSizeOrDefault()).toBe(50000000000);
    expect(getMaxUploadSizeOrDefault()).toBe(50 * bytesToGBMultiplier);
  });
});

describe("generateResourceName", () => {
  it("should return a string that starts with a timestamp and ends with the original name", () => {
    const originalName = "test.tgz";
    const resourceName = generateResourceName(originalName);
    expect(resourceName).toMatch(new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z-${originalName}$`));
  });
});

describe("verifyFileExtension", () => {
  it("should return true if the file has a .tgz extension", () => {
    expect(verifyFileExtension("test.tgz")).toBe(true);
  });

  it("should return false if the file does not have a .tgz extension", () => {
    expect(verifyFileExtension("test.txt")).toBe(false);
  });
});

describe("verifyMultipartContentType", () => {
  it("should return true if the content type starts with multipart/form-data", () => {
    expect(verifyMultipartContentType("multipart/form-data; boundary=something")).toBe(true);
  });

  it("should return false if the content type does not start with multipart/form-data", () => {
    expect(verifyMultipartContentType("application/json")).toBe(false);
  });

  it("should return false if the content type is undefined", () => {
    expect(verifyMultipartContentType(undefined)).toBe(false);
  });
});
