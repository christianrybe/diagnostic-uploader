import { type Request } from "express";
import { type FileFilterCallback } from "multer";
import path from "path";
import BadRequestError from "../error/bad-request-error";

function tgzArchiveFilter(req: Request, file: Express.Multer.File, cb: FileFilterCallback): void {
  const originalName: string = file.originalname ?? "";
  const ext: string = path.extname(originalName).toLowerCase();

  if (ext === ".tgz") {
    cb(null, true);
  } else {
    cb(new BadRequestError("Only .tgz archives are allowed"));
  }
}

export default tgzArchiveFilter;
