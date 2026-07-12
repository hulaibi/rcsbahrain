import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const healthCheck = (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Bahrain Red Crescent API is running",
  });
};

export const databaseHealthCheck = async (req: Request, res: Response) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.json({
      success: true,
      message: "Database connected successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
};

