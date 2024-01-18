import { type Request, type Response, type NextFunction } from "express";
import BadRequestError from "../error/bad-request-error";

const ensureMultipart = (req: Request, res: Response, next: NextFunction): void => {
  const contentTypeHeader = req.headers["content-type"] ?? "";
  if (contentTypeHeader.startsWith("multipart/form-data")) {
    next();
  } else {
    next(new BadRequestError("Invalid request: Content-Type should be multipart/form-data"));
  }
};

export default ensureMultipart;
