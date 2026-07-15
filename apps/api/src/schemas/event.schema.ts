import { z } from "zod";
import { eventStatusSchema, localeSchema } from "./common.schema";

const nonEmptyString = z.string().trim().min(1);

export const createEventSchema = z
  .object({
    slug: nonEmptyString,
    titleAr: nonEmptyString,
    titleEn: nonEmptyString,
    descriptionAr: nonEmptyString,
    descriptionEn: nonEmptyString,
    locationAr: z.string().trim().optional(),
    locationEn: z.string().trim().optional(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    featuredImageUrl: z.string().trim().url().optional(),
    registrationUrl: z.string().trim().url().optional(),
    status: eventStatusSchema.optional(),
    publishedAt: z.coerce.date().optional(),
  })
  .strict()
  .refine((payload) => !payload.endDate || payload.endDate >= payload.startDate, {
    message: "endDate cannot be earlier than startDate",
    path: ["endDate"],
  });

export const updateEventSchema = z
  .object({
    slug: nonEmptyString.optional(),
    titleAr: nonEmptyString.optional(),
    titleEn: nonEmptyString.optional(),
    descriptionAr: nonEmptyString.optional(),
    descriptionEn: nonEmptyString.optional(),
    locationAr: z.string().trim().optional().nullable(),
    locationEn: z.string().trim().optional().nullable(),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional().nullable(),
    featuredImageUrl: z.string().trim().url().optional().nullable(),
    registrationUrl: z.string().trim().url().optional().nullable(),
    status: eventStatusSchema.optional(),
    publishedAt: z.coerce.date().optional().nullable(),
  })
  .strict()
  .refine((payload) => Object.keys(payload).length > 0, {
    message: "At least one field must be provided",
  })
  .refine(
    (payload) => {
      if (!payload.startDate || !payload.endDate) {
        return true;
      }

      return payload.endDate >= payload.startDate;
    },
    {
      message: "endDate cannot be earlier than startDate",
      path: ["endDate"],
    }
  );

export const publicEventListQuerySchema = z
  .object({
    locale: localeSchema.default("ar"),
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(50).default(10),
    search: z.string().trim().min(1).optional(),
    timeframe: z.enum(["upcoming", "past", "all"]).default("all"),
  })
  .strict();

export const adminEventListQuerySchema = z
  .object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(50).default(10),
    search: z.string().trim().min(1).optional(),
    status: eventStatusSchema.optional(),
  })
  .strict();
