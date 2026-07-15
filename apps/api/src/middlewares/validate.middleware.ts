import { NextFunction, Request, RequestHandler, Response } from "express";
import { z, ZodType } from "zod";

type RequestTarget = "body" | "query" | "params";

const validateTarget = <T>(schema: ZodType<T>, target: RequestTarget): RequestHandler => {
  return async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      const parsed = await schema.parseAsync(req[target]);

      if (target === "body") {
        req.body = parsed;
      } else if (target === "query") {
        req.query = parsed as Request["query"];
      } else {
        req.params = parsed as Request["params"];
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

export const validateBody = <T>(schema: ZodType<T>): RequestHandler =>
  validateTarget(schema, "body");

export const validateQuery = <T>(schema: ZodType<T>): RequestHandler =>
  validateTarget(schema, "query");

export const validateParams = <T>(schema: ZodType<T>): RequestHandler =>
  validateTarget(schema, "params");

export const isZodError = (error: unknown): error is z.ZodError =>
  error instanceof z.ZodError;
