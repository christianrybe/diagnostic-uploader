import aws from "aws-sdk";

import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";
import path from "path";

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: process.env.AWS_REGION,
});

const s3 = new S3Client();

const storage = multerS3({
  s3,
  bucket: "diagnostics-easy-to-remember-string-test-env",
  key: function (req: any, file: any, cb: any) {
    const resourceName = file.originalname + "-" + new Date().toISOString();
    req.resourceName = resourceName;
    cb(null, resourceName);
  },
});

// Exported for tests
export const tgzArchiveFilter = (req: any, file: any, cb: any): void => {
  const originalName: string = file.originalname ?? "";
  const ext: string = path.extname(originalName).toLowerCase();

  if (ext === ".tgz") {
    cb(null, true);
  } else {
    cb(new Error("Only .tgz archives are allowed"));
  }
};

export const upload = multer({ storage, fileFilter: tgzArchiveFilter });
