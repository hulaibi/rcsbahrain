import { Request, Response } from "express";
import { z } from "zod";
import {
  adminNewsListQuerySchema,
  createNewsSchema,
  publicNewsListQuerySchema,
  updateNewsSchema,
} from "../schemas/news.schema";
import { idParamSchema, localeQuerySchema, slugParamSchema } from "../schemas/common.schema";
import { AppError } from "../utils/app-error";
import {
  archiveAdminNews,
  createAdminNews,
  getAdminNewsById,
  getPublicNewsBySlug,
  listAdminNews,
  listPublicNews,
  updateAdminNews,
} from "../services/news.service";

export const listPublicNewsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const query = publicNewsListQuerySchema.parse(req.query);
  const result = await listPublicNews(query);

  res.json({
    success: true,
    data: result.items,
    meta: result.meta,
  });
};

export const getPublicNewsBySlugController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { slug } = req.params as z.infer<typeof slugParamSchema>;
  const { locale } = req.query as z.infer<typeof localeQuerySchema>;

  const item = await getPublicNewsBySlug(slug, locale);

  if (!item) {
    throw new AppError("News article not found", 404);
  }

  res.json({
    success: true,
    data: item,
  });
};

export const listAdminNewsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const query = adminNewsListQuerySchema.parse(req.query);
  const result = await listAdminNews(query);

  res.json({
    success: true,
    data: result.items,
    meta: result.meta,
  });
};

export const getAdminNewsByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params as z.infer<typeof idParamSchema>;
  const item = await getAdminNewsById(id);

  res.json({
    success: true,
    data: item,
  });
};

export const createAdminNewsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.user) {
    throw new AppError("Unauthorized", 401);
  }

  const payload = req.body as z.infer<typeof createNewsSchema>;
  const item = await createAdminNews(payload, req.user.userId);

  res.status(201).json({
    success: true,
    data: item,
  });
};

export const updateAdminNewsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.user) {
    throw new AppError("Unauthorized", 401);
  }

  const { id } = req.params as z.infer<typeof idParamSchema>;
  const payload = req.body as z.infer<typeof updateNewsSchema>;
  const item = await updateAdminNews(id, payload, req.user.userId);

  res.json({
    success: true,
    data: item,
  });
};

export const deleteAdminNewsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.user) {
    throw new AppError("Unauthorized", 401);
  }

  const { id } = req.params as z.infer<typeof idParamSchema>;
  const item = await archiveAdminNews(id, req.user.userId);

  res.json({
    success: true,
    data: item,
  });
};
