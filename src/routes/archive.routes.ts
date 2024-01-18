import { Router, type Request, type Response } from "express";
import { upload } from "../middleware/multer";
import ensureMultipart from "../middleware/ensure_multipart";
import { type UploadApiResponse } from "../types/api";

const router = Router();

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
router.post("/", ensureMultipart, upload.single("file"), (req: Request, res: Response) => {
  const response: UploadApiResponse = {
    data: {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      id: req.resourceName!,
    },
  };

  res.status(201).json(response);
});

export default router;
