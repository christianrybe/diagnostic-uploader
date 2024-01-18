import { Router } from "express";
import { respondAfterUpload, listS3Files } from "../controller/archive.controller";
import ensureMultipart from "../middleware/ensure_multipart";
import { upload } from "../middleware/multer";

const router = Router();

router.post("/", ensureMultipart, upload.single("file"), respondAfterUpload);

router.get("/", (req, res, next) => {
  listS3Files(req, res, next).catch(next);
});

export default router;
