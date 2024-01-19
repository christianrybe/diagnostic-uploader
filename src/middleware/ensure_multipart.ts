import { type Request, type Response, type NextFunction } from "express";
import BadRequestError from "../error/bad-request-error";
import { verifyMultipartContentType } from "../domain/file";

const ensureMultipart = (req: Request, res: Response, next: NextFunction): void => {
  if (verifyMultipartContentType(req.headers["content-type"])) {
    next();
  } else {
    next(new BadRequestError("Invalid request: Content-Type should be multipart/form-data"));
  }
};

export default ensureMultipart;
