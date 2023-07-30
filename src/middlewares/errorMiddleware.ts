import { Request, Response, NextFunction } from 'express';

const handleError = (error: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode: number = error.statusCode || 500;

  res.status(statusCode).json({ message: error.message });
}

export default handleError;
