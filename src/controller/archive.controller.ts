import { type NextFunction, type Request, type Response } from "express";
import { type ListFilesApiResponse, type UploadApiResponse } from "../types/api";
import { s3 } from "../middleware/aws";

export const respondAfterUpload = (req: Request, res: Response, next: NextFunction): void => {
  if (req.resourceName != null) {
    const response: UploadApiResponse = {
      data: {
        id: req.resourceName,
      },
    };

    res.status(201).json(response);
  } else {
    next(new Error("Internal error: req.resourceName is null"));
  }
};

const isKeyDefined = (file: { Key?: string }): file is { Key: string } => {
  return file.Key !== undefined;
};

export const listS3Files = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const params = {
    // app would fail to start if AWS_BUCKET_NAME is required to init multer, so this assertion is safe
    // TODO: add proper env var validation upon startup and create config with no undefined values
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    Bucket: process.env.AWS_BUCKET_NAME!,
  };

  await s3
    .listObjectsV2(params)
    .promise()
    .then((data) => {
      const response: ListFilesApiResponse = {
        data: {
          files: data.Contents?.filter(isKeyDefined).map((file) => ({
            id: file.Key,
            url: `https://${params.Bucket}.s3.amazonaws.com/${file.Key.replace(/\s/g, "+")}`,
          })),
        },
      };

      res.status(200).json(response);
    });
};
