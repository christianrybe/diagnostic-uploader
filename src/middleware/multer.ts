import aws from "aws-sdk";

import { S3Client } from "@aws-sdk/client-s3";
import { type Request } from "express";
import multer, { type FileFilterCallback } from "multer";
import multerS3 from "multer-s3";
import path from "path";
import BadRequestError from "../error/bad-request-error";

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: process.env.AWS_REGION,
});

const s3 = new S3Client();

const bucketName = process.env.AWS_BUCKET_NAME;
if (bucketName === undefined) {
  throw new Error("Missing bucket name in environment variables");
}

const storage = multerS3({
  s3,
  bucket: bucketName,
  key: function (req: Request, file: Express.Multer.File, cb: (error: any, key?: string) => void) {
    const resourceName = file.originalname + "-" + new Date().toISOString();
    req.resourceName = resourceName; // pass the resource name back to the API
    cb(null, resourceName);
  },
});

// Exported for tests
export function tgzArchiveFilter(req: Request, file: Express.Multer.File, cb: FileFilterCallback): void {
  const originalName: string = file.originalname ?? "";
  const ext: string = path.extname(originalName).toLowerCase();

  if (ext === ".tgz") {
    cb(null, true);
  } else {
    cb(new BadRequestError("Only .tgz archives are allowed"));
  }
}

const twentyFiveGB = 25000000000;
export const upload = multer({ limits: { fileSize: twentyFiveGB }, storage, fileFilter: tgzArchiveFilter });
