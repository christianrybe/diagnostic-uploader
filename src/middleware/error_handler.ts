import { type NextFunction, type Request, type Response } from "express";
import { type UploadApiResponse } from "../types/api";
import BadRequestError from "../error/bad-request-error";

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
  console.error(err.stack);
  console.log(err.constructor.name);

  let response: UploadApiResponse;

  if (err instanceof BadRequestError) {
    response = {
      error: {
        message: err.message,
        code: err.statusCode,
      },
    };
    res.status(err.statusCode).json(response);
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
