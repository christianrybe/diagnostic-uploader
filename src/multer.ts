import aws from "aws-sdk";

import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: process.env.AWS_REGION,
});

const s3 = new S3Client();

console.log("secretAccessKey", process.env.AWS_SECRET_ACCESS_KEY);

const storage = multerS3({
  s3,
  bucket: "diagnostics-easy-to-remember-string-test-env",
  key: function (req: any, file: any, cb: any) {
    cb(null, file.originalname + "-" + new Date().toISOString());
  },
});

export const upload = multer({ storage });
