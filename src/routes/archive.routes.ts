import { Router } from "express";
import respondAfterUpload from "../controller/archive.controller";
import ensureMultipart from "../middleware/ensure_multipart";
import { upload } from "../middleware/multer";

const router = Router();

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
router.post("/", ensureMultipart, upload.single("file"), respondAfterUpload);

export default router;
