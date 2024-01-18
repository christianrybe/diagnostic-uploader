import { type NextFunction, type Request, type Response } from "express";
import { type UploadApiResponse } from "../types/api";

const respondAfterUpload = (req: Request, res: Response, next: NextFunction): void => {
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

export default respondAfterUpload;
