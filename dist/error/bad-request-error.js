"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BadRequestError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 400;
        this.name = "BadRequestError";
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.default = BadRequestError;
