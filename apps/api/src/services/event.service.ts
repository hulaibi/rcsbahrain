import { EventStatus, Prisma } from "@prisma/client";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import {
  adminEventListQuerySchema,
  createEventSchema,
  publicEventListQuerySchema,
  updateEventSchema,
} from "../schemas/event.schema";
import { AppError } from "../utils/app-error";
import { toPagination, toPaginationMeta } from "../utils/pagination";
import { normalizeSlug } from "../utils/slug";

export type CreateEventInput = z.infer<typeof createEventSchema>;
export type UpdateEventInput = z.infer<typeof updateEventSchema>;
export type PublicEventListQuery = z.infer<typeof publicEventListQuerySchema>;
export type AdminEventListQuery = z.infer<typeof adminEventListQuerySchema>;

const buildPublishedFilter = (): Prisma.EventWhereInput => ({
  status: EventStatus.PUBLISHED,
  OR: [{ publishedAt: null }, { publishedAt: { lte: new Date() } }],
});

export const listPublicEvents = async (query: PublicEventListQuery) => {
  const { locale, page, limit, search, timeframe } = query;
  const { skip, take } = toPagination({ page, limit });

  const now = new Date();

  const timeframeFilter: Prisma.EventWhereInput =
    timeframe === "upcoming"
      ? { startDate: { gte: now } }
      : timeframe === "past"
        ? { startDate: { lt: now } }
        : {};

  const orderBy: Prisma.EventOrderByWithRelationInput[] =
    timeframe === "upcoming"
      ? [{ startDate: "asc" }]
      : timeframe === "past"
        ? [{ startDate: "desc" }]
        : [{ startDate: "asc" }];

  const where: Prisma.EventWhereInput = {
    ...buildPublishedFilter(),
    ...timeframeFilter,
    ...(search
      ? {
          OR: [
            locale === "ar"
              ? { titleAr: { contains: search, mode: "insensitive" } }
              : { titleEn: { contains: search, mode: "insensitive" } },
            locale === "ar"
              ? { descriptionAr: { contains: search, mode: "insensitive" } }
              : { descriptionEn: { contains: search, mode: "insensitive" } },
          ],
        }
      : {}),
  };

  const [items, total] = await Promise.all([
    prisma.event.findMany({
      where,
      skip,
      take,
      orderBy,
    }),
    prisma.event.count({ where }),
  ]);

  return {
    items: items.map((item) => ({
      id: item.id,
      slug: item.slug,
      title: locale === "ar" ? item.titleAr : item.titleEn,
      content: locale === "ar" ? item.descriptionAr : item.descriptionEn,
      excerpt: null,
      featuredImageUrl: item.featuredImageUrl,
      location: locale === "ar" ? item.locationAr : item.locationEn,
      startDate: item.startDate,
      endDate: item.endDate,
      registrationUrl: item.registrationUrl,
      publishedAt: item.publishedAt,
    })),
    meta: toPaginationMeta({ page, limit }, total),
  };
};

export const getPublicEventBySlug = async (slug: string, locale: "ar" | "en") => {
  const item = await prisma.event.findFirst({
    where: {
      slug,
      ...buildPublishedFilter(),
    },
  });

  if (!item) {
    return null;
  }

  return {
    id: item.id,
    slug: item.slug,
    title: locale === "ar" ? item.titleAr : item.titleEn,
    content: locale === "ar" ? item.descriptionAr : item.descriptionEn,
    excerpt: null,
    featuredImageUrl: item.featuredImageUrl,
    location: locale === "ar" ? item.locationAr : item.locationEn,
    startDate: item.startDate,
    endDate: item.endDate,
    registrationUrl: item.registrationUrl,
    publishedAt: item.publishedAt,
    updatedAt: item.updatedAt,
  };
};

export const listAdminEvents = async (query: AdminEventListQuery) => {
  const { page, limit, search, status } = query;
  const { skip, take } = toPagination({ page, limit });

  const where: Prisma.EventWhereInput = {
    ...(status ? { status } : {}),
    ...(search
      ? {
          OR: [
            { titleAr: { contains: search, mode: "insensitive" } },
            { titleEn: { contains: search, mode: "insensitive" } },
            { descriptionAr: { contains: search, mode: "insensitive" } },
            { descriptionEn: { contains: search, mode: "insensitive" } },
            { slug: { contains: search, mode: "insensitive" } },
          ],
        }
      : {}),
  };

  const [items, total] = await Promise.all([
    prisma.event.findMany({
      where,
      skip,
      take,
      orderBy: { updatedAt: "desc" },
      include: {
        createdBy: { select: { id: true, fullName: true, email: true } },
        updatedBy: { select: { id: true, fullName: true, email: true } },
      },
    }),
    prisma.event.count({ where }),
  ]);

  return {
    items,
    meta: toPaginationMeta({ page, limit }, total),
  };
};

export const getAdminEventById = async (id: string) => {
  const item = await prisma.event.findUnique({
    where: { id },
    include: {
      createdBy: { select: { id: true, fullName: true, email: true } },
      updatedBy: { select: { id: true, fullName: true, email: true } },
    },
  });

  if (!item) {
    throw new AppError("Event not found", 404);
  }

  return item;
};

export const createAdminEvent = async (input: CreateEventInput, actorUserId: string) => {
  const normalizedSlug = normalizeSlug(input.slug);
  const normalizedStatus = input.status ?? EventStatus.DRAFT;
  const publishedAt =
    normalizedStatus === EventStatus.PUBLISHED
      ? input.publishedAt ?? new Date()
      : input.publishedAt ?? null;

  const item = await prisma.event.create({
    data: {
      slug: normalizedSlug,
      titleAr: input.titleAr,
      titleEn: input.titleEn,
      descriptionAr: input.descriptionAr,
      descriptionEn: input.descriptionEn,
      ...(input.locationAr !== undefined ? { locationAr: input.locationAr } : {}),
      ...(input.locationEn !== undefined ? { locationEn: input.locationEn } : {}),
      startDate: input.startDate,
      ...(input.endDate !== undefined ? { endDate: input.endDate } : {}),
      ...(input.featuredImageUrl !== undefined
        ? { featuredImageUrl: input.featuredImageUrl }
        : {}),
      ...(input.registrationUrl !== undefined
        ? { registrationUrl: input.registrationUrl }
        : {}),
      status: normalizedStatus,
      publishedAt,
      createdById: actorUserId,
      updatedById: actorUserId,
    },
    include: {
      createdBy: { select: { id: true, fullName: true, email: true } },
      updatedBy: { select: { id: true, fullName: true, email: true } },
    },
  });

  return item;
};

export const updateAdminEvent = async (
  id: string,
  input: UpdateEventInput,
  actorUserId: string
) => {
  const existing = await prisma.event.findUnique({ where: { id } });

  if (!existing) {
    throw new AppError("Event not found", 404);
  }

  const nextStartDate = input.startDate ?? existing.startDate;
  const nextEndDate = input.endDate === undefined ? existing.endDate : input.endDate;

  if (nextEndDate && nextEndDate < nextStartDate) {
    throw new AppError("endDate cannot be earlier than startDate", 400);
  }

  const status = input.status ?? existing.status;

  const data: Prisma.EventUpdateInput = {
    ...(input.slug ? { slug: normalizeSlug(input.slug) } : {}),
    ...(input.titleAr ? { titleAr: input.titleAr } : {}),
    ...(input.titleEn ? { titleEn: input.titleEn } : {}),
    ...(input.descriptionAr ? { descriptionAr: input.descriptionAr } : {}),
    ...(input.descriptionEn ? { descriptionEn: input.descriptionEn } : {}),
    ...(input.locationAr !== undefined ? { locationAr: input.locationAr } : {}),
    ...(input.locationEn !== undefined ? { locationEn: input.locationEn } : {}),
    ...(input.startDate ? { startDate: input.startDate } : {}),
    ...(input.endDate !== undefined ? { endDate: input.endDate } : {}),
    ...(input.featuredImageUrl !== undefined
      ? { featuredImageUrl: input.featuredImageUrl }
      : {}),
    ...(input.registrationUrl !== undefined
      ? { registrationUrl: input.registrationUrl }
      : {}),
    ...(input.status ? { status: input.status } : {}),
    ...(input.publishedAt !== undefined ? { publishedAt: input.publishedAt } : {}),
    updatedBy: { connect: { id: actorUserId } },
  };

  if (status === EventStatus.PUBLISHED && !existing.publishedAt && input.publishedAt === undefined) {
    data.publishedAt = new Date();
  }

  const item = await prisma.event.update({
    where: { id },
    data,
    include: {
      createdBy: { select: { id: true, fullName: true, email: true } },
      updatedBy: { select: { id: true, fullName: true, email: true } },
    },
  });

  return item;
};

export const archiveAdminEvent = async (id: string, actorUserId: string) => {
  const item = await prisma.event.update({
    where: { id },
    data: {
      status: EventStatus.ARCHIVED,
      updatedBy: { connect: { id: actorUserId } },
    },
    include: {
      createdBy: { select: { id: true, fullName: true, email: true } },
      updatedBy: { select: { id: true, fullName: true, email: true } },
    },
  });

  return item;
};
