import aws from "aws-sdk";
import { S3Client } from "@aws-sdk/client-s3";

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: process.env.AWS_REGION,
});

export const s3Client = new S3Client();

export const s3 = new aws.S3();
