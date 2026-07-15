import { z } from "zod";
import { slugPattern } from "../utils/slug";

export const localeSchema = z.enum(["ar", "en"]);

export const paginationQuerySchema = z
  .object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(50).default(10),
    search: z.string().trim().min(1).optional(),
  })
  .strict();

export const localeQuerySchema = z
  .object({
    locale: localeSchema.default("ar"),
  })
  .strict();

export const localizedPaginationQuerySchema = z
  .object({
    locale: localeSchema.default("ar"),
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(50).default(10),
    search: z.string().trim().min(1).optional(),
  })
  .strict();

export const slugParamSchema = z
  .object({
    slug: z
      .string()
      .trim()
      .toLowerCase()
      .regex(slugPattern, "Slug must be lowercase and URL-safe"),
  })
  .strict();

export const idParamSchema = z
  .object({
    id: z.string().cuid("Invalid record id"),
  })
  .strict();

export const contentStatusSchema = z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]);
export const eventStatusSchema = z.enum([
  "DRAFT",
  "PUBLISHED",
  "CANCELLED",
  "ARCHIVED",
]);
