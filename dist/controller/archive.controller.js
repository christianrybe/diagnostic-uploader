"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listS3Files = exports.respondAfterUpload = void 0;
const aws_1 = require("../middleware/aws");
const respondAfterUpload = (req, res, next) => {
    if (req.resourceName != null) {
        const response = {
            data: {
                id: req.resourceName,
            },
        };
        res.status(201).json(response);
    }
    else {
        next(new Error("Internal error: req.resourceName is null"));
    }
};
exports.respondAfterUpload = respondAfterUpload;
const isKeyDefined = (file) => {
    return file.Key !== undefined;
};
const listS3Files = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = {
        // app would fail to start if AWS_BUCKET_NAME is required to init multer, so this assertion is safe
        // TODO: add proper env var validation upon startup and create config with no undefined values
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        Bucket: process.env.AWS_BUCKET_NAME,
    };
    yield aws_1.s3
        .listObjectsV2(params)
        .promise()
        .then((data) => {
        var _a;
        const response = {
            data: {
                files: (_a = data.Contents) === null || _a === void 0 ? void 0 : _a.filter(isKeyDefined).map((file) => ({
                    id: file.Key,
                    url: `https://${params.Bucket}.s3.amazonaws.com/${file.Key.replace(/\s/g, "+")}`,
                })),
            },
        };
        res.status(200).json(response);
    });
});
exports.listS3Files = listS3Files;
