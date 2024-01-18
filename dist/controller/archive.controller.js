"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = respondAfterUpload;
