import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { sendError } from "../utils/api-response";

/**
 * Custom error class with status code
 */
export class ApiError extends Error {
  statusCode: number;

  constructor(
    message: string,
    statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR
  ) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Not found error handler - for routes that don't exist
 */
export const notFoundHandler = (req: Request, res: Response): Response => {
  return sendError(
    res,
    `Cannot ${req.method} ${req.originalUrl}`,
    { path: req.originalUrl },
    StatusCodes.NOT_FOUND
  );
};

/**
 * Global error handler middleware
 */
export const errorHandler = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): Response => {
  // If it's a Sequelize error, customize the message
  if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    return sendError(
      res,
      "Validation Error",
      { details: err.message },
      StatusCodes.BAD_REQUEST
    );
  }

  // Handle ApiError instances with their status code
  if (err instanceof ApiError) {
    return sendError(
      res,
      err.message,
      process.env.NODE_ENV === "development" ? err.stack : undefined,
      err.statusCode
    );
  }

  // Default error handler
  return sendError(
    res,
    err.message || "Something went wrong",
    process.env.NODE_ENV === "development" ? err.stack : undefined,
    StatusCodes.INTERNAL_SERVER_ERROR
  );
};
