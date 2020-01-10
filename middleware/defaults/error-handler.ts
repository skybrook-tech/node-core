import { Request, Response, NextFunction } from "express";

interface ErrorObject {
  status: number;
  message: string;
  code: string;
}

const errorHandler = (error: ErrorObject, req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV !== "test") {
    console.error(error);
  }
  res.set("Content-Type", "application/json");
  res.status(error.status || 400).json({ error });
};

export default errorHandler;
