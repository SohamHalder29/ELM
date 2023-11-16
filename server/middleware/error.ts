import { NextFunction, Request, Response } from "express";
import { Errorhandler } from "../utils/ErrorHandler";

export const ErrorMiddleware = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server error";

  //Wrong MongoDB ID & Password
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid ${err.path}`;
    err = new Errorhandler(message, 400);
  }

  //Duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new Errorhandler(message, 400);
  }

  //wrong jwt token error
  if (err.name === "JsonWebTokenError") {
    const message = `JsonWebToken is invalid. Try again`;
    err = new Errorhandler(message, 400);
  }

  //Jwt expire error
  if (err.name === "TokenExpireError") {
    const message = `JsonWebToken is expire. Try again`;
    err = new Errorhandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
