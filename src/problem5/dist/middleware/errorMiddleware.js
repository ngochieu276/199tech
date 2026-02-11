"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const AppError_1 = require("../utils/AppError");
const http_status_codes_1 = require("http-status-codes");
const errorMiddleware = (err, // AppError | Error
req, res, next) => {
    let error = err;
    if (!(error instanceof AppError_1.AppError)) {
        console.error('Unexpected Error:', err);
        error = new AppError_1.AppError('Something went wrong', http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
    }
    const appError = error;
    res.status(appError.statusCode).json({
        status: appError.status,
        message: appError.message,
    });
};
exports.errorMiddleware = errorMiddleware;
