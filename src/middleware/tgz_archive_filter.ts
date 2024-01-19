import { type Request } from "express";
import { type FileFilterCallback } from "multer";
import BadRequestError from "../error/bad-request-error";
import { verifyFileExtension } from "../domain/file";

function tgzArchiveFilter(req: Request, file: Express.Multer.File, cb: FileFilterCallback): void {
  if (verifyFileExtension(file.originalname)) {
    cb(null, true);
  } else {
    cb(new BadRequestError("Only .tgz archives are allowed"));
  }
}

export default tgzArchiveFilter;
