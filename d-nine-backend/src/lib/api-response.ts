import { ApiResponse, ApiSuccess, ApiFailure } from '@d-nine/contracts';
import { Request, Response } from 'express';

export function sendSuccess<T>(
  req: Request,
  res: Response,
  statusCode: number,
  code: string,
  message: string,
  data: T
) {
  const response: ApiSuccess<T> = {
    success: true,
    code,
    message,
    data,
    meta: {
      requestId: (req as any).id as string || 'unknown',
      timestamp: new Date().toISOString(),
    },
  };
  return res.status(statusCode).json(response);
}

export function sendFailure(
  req: Request,
  res: Response,
  statusCode: number,
  code: string,
  message: string,
  errors?: ApiFailure['errors']
) {
  const response: ApiFailure = {
    success: false,
    code,
    message,
    ...(errors ? { errors } : {}),
    meta: {
      requestId: (req as any).id as string || 'unknown',
      timestamp: new Date().toISOString(),
    },
  };
  return res.status(statusCode).json(response);
}
