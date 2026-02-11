import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { AppError } from '../utils/AppError';
import { StatusCodes } from 'http-status-codes';

export const validate = (schema: AnyZodObject) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const messages = error.errors.map((e) => e.message).join(', ');
      next(new AppError(`Validation Error: ${messages}`, StatusCodes.BAD_REQUEST));
    } else {
      next(error);
    }
  }
};
