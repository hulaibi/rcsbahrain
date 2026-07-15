import { Request, Response } from "express";
import { z } from "zod";
import {
  adminEventListQuerySchema,
  createEventSchema,
  publicEventListQuerySchema,
  updateEventSchema,
} from "../schemas/event.schema";
import { idParamSchema, localeQuerySchema, slugParamSchema } from "../schemas/common.schema";
import { AppError } from "../utils/app-error";
import {
  archiveAdminEvent,
  createAdminEvent,
  getAdminEventById,
  getPublicEventBySlug,
  listAdminEvents,
  listPublicEvents,
  updateAdminEvent,
} from "../services/event.service";

export const listPublicEventsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const query = publicEventListQuerySchema.parse(req.query);
  const result = await listPublicEvents(query);

  res.json({
    success: true,
    data: result.items,
    meta: result.meta,
  });
};

export const getPublicEventBySlugController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { slug } = req.params as z.infer<typeof slugParamSchema>;
  const { locale } = req.query as z.infer<typeof localeQuerySchema>;

  const item = await getPublicEventBySlug(slug, locale);

  if (!item) {
    throw new AppError("Event not found", 404);
  }

  res.json({
    success: true,
    data: item,
  });
};

export const listAdminEventsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const query = adminEventListQuerySchema.parse(req.query);
  const result = await listAdminEvents(query);

  res.json({
    success: true,
    data: result.items,
    meta: result.meta,
  });
};

export const getAdminEventByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params as z.infer<typeof idParamSchema>;
  const item = await getAdminEventById(id);

  res.json({
    success: true,
    data: item,
  });
};

export const createAdminEventController = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.user) {
    throw new AppError("Unauthorized", 401);
  }

  const payload = req.body as z.infer<typeof createEventSchema>;
  const item = await createAdminEvent(payload, req.user.userId);

  res.status(201).json({
    success: true,
    data: item,
  });
};

export const updateAdminEventController = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.user) {
    throw new AppError("Unauthorized", 401);
  }

  const { id } = req.params as z.infer<typeof idParamSchema>;
  const payload = req.body as z.infer<typeof updateEventSchema>;
  const item = await updateAdminEvent(id, payload, req.user.userId);

  res.json({
    success: true,
    data: item,
  });
};

export const deleteAdminEventController = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.user) {
    throw new AppError("Unauthorized", 401);
  }

  const { id } = req.params as z.infer<typeof idParamSchema>;
  const item = await archiveAdminEvent(id, req.user.userId);

  res.json({
    success: true,
    data: item,
  });
};
