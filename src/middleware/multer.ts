import { type Request } from "express";
import multer from "multer";
import multerS3 from "multer-s3";
import tgzArchiveFilter from "./tgz_archive_filter";
import { s3Client } from "./aws";
import { generateResourceName, maxUploadSizeOrFiftyGB } from "../domain/file";

const bucketName = process.env.AWS_BUCKET_NAME;
if (bucketName === undefined) {
  throw new Error("Missing bucket name in environment variables");
}

const storage = multerS3({
  s3: s3Client,
  bucket: bucketName,
  key: function (req: Request, file: Express.Multer.File, cb: (error: any, key?: string) => void) {
    const resourceName = generateResourceName(file.originalname);
    req.resourceName = resourceName; // pass the resource name back to the API
    cb(null, resourceName);
  },
});

export const upload = multer({ limits: { fileSize: maxUploadSizeOrFiftyGB }, storage, fileFilter: tgzArchiveFilter });
