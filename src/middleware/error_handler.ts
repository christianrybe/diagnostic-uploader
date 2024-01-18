import { type NextFunction, type Request, type Response } from "express";
import { type UploadApiResponse } from "../types/api";
import BadRequestError from "../error/bad-request-error";
import multer from "multer";

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
  console.error(err.stack);

  let response: UploadApiResponse;

  if (err instanceof BadRequestError) {
    response = {
      error: {
        message: err.message,
        code: err.statusCode,
      },
    };
    res.status(err.statusCode).json(response);
  } else if (err instanceof multer.MulterError) {
    response = {
      error: {
        message: err.message,
        code: 400,
      },
    };
    res.status(400).json(response);
  } else {
    response = {
      error: {
        message: err.message,
        code: 500,
      },
    };
    res.status(500).json(response);
  }
};

export default errorHandler;
