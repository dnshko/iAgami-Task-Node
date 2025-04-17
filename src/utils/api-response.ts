import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

/**
 * Standard API Response format
 */
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: any;
}

/**
 * Send success response
 * @param res Express Response object
 * @param data Response data
 * @param message Success message
 * @param statusCode HTTP status code
 */
export const sendSuccess = <T>(
  res: Response,
  data: T,
  message = 'Success',
  statusCode = StatusCodes.OK
): Response => {
  const response: ApiResponse<T> = {
    success: true,
    message,
    data,
  };
  return res.status(statusCode).json(response);
};

/**
 * Send error response
 * @param res Express Response object
 * @param message Error message
 * @param error Error details
 * @param statusCode HTTP status code
 */
export const sendError = (
  res: Response,
  message = 'An error occurred',
  error?: any,
  statusCode = StatusCodes.INTERNAL_SERVER_ERROR
): Response => {
  const response: ApiResponse<null> = {
    success: false,
    message,
    error: error || null,
  };
  return res.status(statusCode).json(response);
};