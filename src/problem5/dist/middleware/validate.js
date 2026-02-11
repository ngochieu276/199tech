"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const zod_1 = require("zod");
const AppError_1 = require("../utils/AppError");
const http_status_codes_1 = require("http-status-codes");
const validate = (schema) => (req, res, next) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            const messages = error.errors.map((e) => e.message).join(', ');
            next(new AppError_1.AppError(`Validation Error: ${messages}`, http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        else {
            next(error);
        }
    }
};
exports.validate = validate;
