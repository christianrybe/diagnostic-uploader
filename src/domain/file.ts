import path from "path";

export const maxUploadSizeOrFiftyGB = process.env.MAX_UPLOAD_SIZE ? Number(process.env.MAX_UPLOAD_SIZE) : 50000000000;

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
