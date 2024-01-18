import { type Request } from "express";
import multer from "multer";
import multerS3 from "multer-s3";
import tgzArchiveFilter from "./tgz_archive_filter";
import { s3Client } from "./aws";

const bucketName = process.env.AWS_BUCKET_NAME;
if (bucketName === undefined) {
  throw new Error("Missing bucket name in environment variables");
}

const storage = multerS3({
  s3: s3Client,
  bucket: bucketName,
  key: function (req: Request, file: Express.Multer.File, cb: (error: any, key?: string) => void) {
    const resourceName = file.originalname + "-" + new Date().toISOString();
    req.resourceName = resourceName; // pass the resource name back to the API
    cb(null, resourceName);
  },
});

const twentyFiveGB = 25000000000;
export const upload = multer({ limits: { fileSize: twentyFiveGB }, storage, fileFilter: tgzArchiveFilter });
