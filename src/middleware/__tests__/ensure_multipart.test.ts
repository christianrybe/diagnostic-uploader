/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { type Request, type Response, type NextFunction } from "express";
import BadRequestError from "../../error/bad-request-error";
import ensureMultipart from "../ensure_multipart";

describe("ensureMultipart middleware", () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    req = {} as Request;
    res = {} as Response;
    next = jest.fn() as NextFunction;
  });

  it("should process request if Content-Type is multipart/form-data", () => {
    req.headers = { "content-type": "multipart/form-data" };

    ensureMultipart(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith();
  });

  it("should return BadRequestError if Content-Type is not multipart/form-data", () => {
    req.headers = { "content-type": "application/json" };

    ensureMultipart(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(new BadRequestError("Invalid request: Content-Type should be multipart/form-data"));
  });
});
