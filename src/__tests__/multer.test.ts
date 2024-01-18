/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { type Request } from "express";
import { tgzArchiveFilter } from "../multer";

describe("tgzArchiveFilter", () => {
  it("should process the upload if the file extension is .tgz", () => {
    const req: Request = {} as Request;
    const file = {
      originalname: "archive.tgz",
    };

    const cb = jest.fn();

    tgzArchiveFilter(req, file, cb);

    expect(cb).toHaveBeenCalledWith(null, true);
  });

  it("should throw an error if the file extension is not .tgz", () => {
    const req: Request = {} as Request;
    const file = {
      originalname: "archive.zip",
    };

    const cb = jest.fn();

    tgzArchiveFilter(req, file, cb);

    expect(cb).toHaveBeenCalledWith(new Error("Only .tgz archives are allowed"));
  });
});
