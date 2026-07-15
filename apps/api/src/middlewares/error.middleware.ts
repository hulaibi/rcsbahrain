import { NextFunction, Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { AppError } from "../utils/app-error";
import { isZodError } from "./validate.middleware";

export const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (isZodError(error)) {
    res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: error.issues.map((issue) => `${issue.path.join(".") || "request"}: ${issue.message}`),
    });
    return;
  }

  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
      errors: error.errors,
    });
    return;
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      res.status(409).json({
        success: false,
        message: "Duplicate value violates unique constraint",
        errors: ["A record with this unique field already exists"],
      });
      return;
    }

    if (error.code === "P2025") {
      res.status(404).json({
        success: false,
        message: "Record not found",
        errors: [],
      });
      return;
    }
  }

  if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {
    res.status(401).json({
      success: false,
      message: "Invalid authentication token",
      errors: [],
    });
    return;
  }

  res.status(500).json({
    success: false,
    message: "Internal server error",
    errors: [],
  });
};
