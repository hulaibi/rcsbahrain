import { Request, Response } from "express";
import { AppError } from "../utils/app-error";
import {
  createAdminPage,
  getAdminPageById,
  getPublicPageBySlug,
  listAdminPages,
  updateAdminPage,
  archiveAdminPage,
} from "../services/page.service";
import { z } from "zod";
import {
  adminPageListQuerySchema,
  createPageSchema,
  updatePageSchema,
} from "../schemas/page.schema";
import { idParamSchema, localeQuerySchema, slugParamSchema } from "../schemas/common.schema";

export const getPublicPageBySlugController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { slug } = req.params as z.infer<typeof slugParamSchema>;
  const { locale } = req.query as z.infer<typeof localeQuerySchema>;

  const page = await getPublicPageBySlug(slug, locale);

  if (!page) {
    throw new AppError("Page not found", 404);
  }

  res.json({
    success: true,
    data: page,
  });
};

export const listAdminPagesController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const query = adminPageListQuerySchema.parse(req.query);
  const result = await listAdminPages(query);

  res.json({
    success: true,
    data: result.items,
    meta: result.meta,
  });
};

export const getAdminPageByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params as z.infer<typeof idParamSchema>;
  const page = await getAdminPageById(id);

  res.json({
    success: true,
    data: page,
  });
};

export const createAdminPageController = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.user) {
    throw new AppError("Unauthorized", 401);
  }

  const payload = req.body as z.infer<typeof createPageSchema>;
  const page = await createAdminPage(payload, req.user.userId);

  res.status(201).json({
    success: true,
    data: page,
  });
};

export const updateAdminPageController = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.user) {
    throw new AppError("Unauthorized", 401);
  }

  const { id } = req.params as z.infer<typeof idParamSchema>;
  const payload = req.body as z.infer<typeof updatePageSchema>;
  const page = await updateAdminPage(id, payload, req.user.userId);

  res.json({
    success: true,
    data: page,
  });
};

export const deleteAdminPageController = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.user) {
    throw new AppError("Unauthorized", 401);
  }

  const { id } = req.params as z.infer<typeof idParamSchema>;
  const page = await archiveAdminPage(id, req.user.userId);

  res.json({
    success: true,
    data: page,
  });
};
