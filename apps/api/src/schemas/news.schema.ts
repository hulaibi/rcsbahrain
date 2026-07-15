import { z } from "zod";
import { contentStatusSchema, localeSchema } from "./common.schema";

const nonEmptyString = z.string().trim().min(1);

export const createNewsSchema = z
  .object({
    slug: nonEmptyString,
    titleAr: nonEmptyString,
    titleEn: nonEmptyString,
    contentAr: nonEmptyString,
    contentEn: nonEmptyString,
    excerptAr: z.string().trim().optional(),
    excerptEn: z.string().trim().optional(),
    categoryAr: z.string().trim().optional(),
    categoryEn: z.string().trim().optional(),
    featuredImageUrl: z.string().trim().url().optional(),
    seoTitleAr: z.string().trim().optional(),
    seoTitleEn: z.string().trim().optional(),
    seoDescriptionAr: z.string().trim().optional(),
    seoDescriptionEn: z.string().trim().optional(),
    status: contentStatusSchema.optional(),
    publishedAt: z.coerce.date().optional(),
  })
  .strict();

export const updateNewsSchema = z
  .object({
    slug: nonEmptyString.optional(),
    titleAr: nonEmptyString.optional(),
    titleEn: nonEmptyString.optional(),
    contentAr: nonEmptyString.optional(),
    contentEn: nonEmptyString.optional(),
    excerptAr: z.string().trim().optional().nullable(),
    excerptEn: z.string().trim().optional().nullable(),
    categoryAr: z.string().trim().optional().nullable(),
    categoryEn: z.string().trim().optional().nullable(),
    featuredImageUrl: z.string().trim().url().optional().nullable(),
    seoTitleAr: z.string().trim().optional().nullable(),
    seoTitleEn: z.string().trim().optional().nullable(),
    seoDescriptionAr: z.string().trim().optional().nullable(),
    seoDescriptionEn: z.string().trim().optional().nullable(),
    status: contentStatusSchema.optional(),
    publishedAt: z.coerce.date().optional().nullable(),
  })
  .strict()
  .refine((payload) => Object.keys(payload).length > 0, {
    message: "At least one field must be provided",
  });

export const publicNewsListQuerySchema = z
  .object({
    locale: localeSchema.default("ar"),
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(50).default(10),
    search: z.string().trim().min(1).optional(),
    category: z.string().trim().min(1).optional(),
  })
  .strict();

export const adminNewsListQuerySchema = z
  .object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(50).default(10),
    search: z.string().trim().min(1).optional(),
    status: contentStatusSchema.optional(),
  })
  .strict();
