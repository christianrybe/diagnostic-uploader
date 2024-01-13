import express, { type Request, type Response, type Application } from "express";
import dotenv from "dotenv";
import { upload } from "./multer";

dotenv.config();

const app: Application = express();
const port = process.env.PORT ?? 8000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     console.log("destination", "/tmp/uploads/");
//     cb(null, "/tmp/uploads/");
//   },
//   filename: function (req, file, cb) {
//     console.log(
//       "filename",
//       file.fieldname + "-" + Date.now() + "-" + file.originalname
//     );
//     cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage });

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
app.post("/upload", upload.single("file"), (req: Request, res: Response) => {
  res.send("File uploaded successfully");
});

app.listen(port, () => {
  console.log(`Server online at http://localhost:${port}`);
});
