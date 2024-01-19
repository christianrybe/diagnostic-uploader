import path from "path";

const fiftyGB = 50000000000;
// Exported for tests
export const getMaxUploadSizeOrDefault = (): number => (process.env.MAX_UPLOAD_SIZE ? Number(process.env.MAX_UPLOAD_SIZE) : fiftyGB);

export const maxUploadSizeOrFiftyGB = getMaxUploadSizeOrDefault();

export const generateResourceName = (originalName: string): string => {
  return new Date().toISOString() + "-" + originalName;
};

const acceptedFileExtensions = [".tgz"];

export const verifyFileExtension = (originalName: string): boolean => {
  const ext = path.extname(originalName).toLowerCase();
  return acceptedFileExtensions.includes(ext);
};

export const verifyMultipartContentType = (contentTypeHeader: string | undefined): boolean => {
  return !!contentTypeHeader?.startsWith("multipart/form-data");
};
