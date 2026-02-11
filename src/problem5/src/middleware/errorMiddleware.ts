import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';
import { StatusCodes } from 'http-status-codes';

export const errorMiddleware = (
  err: any, // AppError | Error
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = err;

  if (!(error instanceof AppError)) {
    console.error('Unexpected Error:', err);
    error = new AppError('Something went wrong', StatusCodes.INTERNAL_SERVER_ERROR);
  }

  const appError = error as AppError;

  res.status(appError.statusCode).json({
    status: appError.status,
    message: appError.message,
  });
};
