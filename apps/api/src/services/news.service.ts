import { ContentStatus, Prisma } from "@prisma/client";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import {
  adminNewsListQuerySchema,
  createNewsSchema,
  publicNewsListQuerySchema,
  updateNewsSchema,
} from "../schemas/news.schema";
import { AppError } from "../utils/app-error";
import { toPagination, toPaginationMeta } from "../utils/pagination";
import { normalizeSlug } from "../utils/slug";

export type CreateNewsInput = z.infer<typeof createNewsSchema>;
export type UpdateNewsInput = z.infer<typeof updateNewsSchema>;
export type PublicNewsListQuery = z.infer<typeof publicNewsListQuerySchema>;
export type AdminNewsListQuery = z.infer<typeof adminNewsListQuerySchema>;

const buildPublishedFilter = (): Prisma.NewsWhereInput => ({
  status: ContentStatus.PUBLISHED,
  OR: [{ publishedAt: null }, { publishedAt: { lte: new Date() } }],
});

export const listPublicNews = async (query: PublicNewsListQuery) => {
  const { locale, page, limit, search, category } = query;
  const { skip, take } = toPagination({ page, limit });

  const where: Prisma.NewsWhereInput = {
    ...buildPublishedFilter(),
    ...(search
      ? {
          OR: [
            locale === "ar"
              ? { titleAr: { contains: search, mode: "insensitive" } }
              : { titleEn: { contains: search, mode: "insensitive" } },
            locale === "ar"
              ? { contentAr: { contains: search, mode: "insensitive" } }
              : { contentEn: { contains: search, mode: "insensitive" } },
          ],
        }
      : {}),
    ...(category
      ? locale === "ar"
        ? { categoryAr: { equals: category, mode: "insensitive" } }
        : { categoryEn: { equals: category, mode: "insensitive" } }
      : {}),
  };

  const [items, total] = await Promise.all([
    prisma.news.findMany({
      where,
      skip,
      take,
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    }),
    prisma.news.count({ where }),
  ]);

  return {
    items: items.map((item) => ({
      id: item.id,
      slug: item.slug,
      title: locale === "ar" ? item.titleAr : item.titleEn,
      content: locale === "ar" ? item.contentAr : item.contentEn,
      excerpt: locale === "ar" ? item.excerptAr : item.excerptEn,
      category: locale === "ar" ? item.categoryAr : item.categoryEn,
      featuredImageUrl: item.featuredImageUrl,
      publishedAt: item.publishedAt,
    })),
    meta: toPaginationMeta({ page, limit }, total),
  };
};

export const getPublicNewsBySlug = async (slug: string, locale: "ar" | "en") => {
  const item = await prisma.news.findFirst({
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
    content: locale === "ar" ? item.contentAr : item.contentEn,
    excerpt: locale === "ar" ? item.excerptAr : item.excerptEn,
    category: locale === "ar" ? item.categoryAr : item.categoryEn,
    featuredImageUrl: item.featuredImageUrl,
    publishedAt: item.publishedAt,
    updatedAt: item.updatedAt,
  };
};

export const listAdminNews = async (query: AdminNewsListQuery) => {
  const { page, limit, search, status } = query;
  const { skip, take } = toPagination({ page, limit });

  const where: Prisma.NewsWhereInput = {
    ...(status ? { status } : {}),
    ...(search
      ? {
          OR: [
            { titleAr: { contains: search, mode: "insensitive" } },
            { titleEn: { contains: search, mode: "insensitive" } },
            { contentAr: { contains: search, mode: "insensitive" } },
            { contentEn: { contains: search, mode: "insensitive" } },
            { slug: { contains: search, mode: "insensitive" } },
          ],
        }
      : {}),
  };

  const [items, total] = await Promise.all([
    prisma.news.findMany({
      where,
      skip,
      take,
      orderBy: { updatedAt: "desc" },
      include: {
        createdBy: { select: { id: true, fullName: true, email: true } },
        updatedBy: { select: { id: true, fullName: true, email: true } },
      },
    }),
    prisma.news.count({ where }),
  ]);

  return {
    items,
    meta: toPaginationMeta({ page, limit }, total),
  };
};

export const getAdminNewsById = async (id: string) => {
  const item = await prisma.news.findUnique({
    where: { id },
    include: {
      createdBy: { select: { id: true, fullName: true, email: true } },
      updatedBy: { select: { id: true, fullName: true, email: true } },
    },
  });

  if (!item) {
    throw new AppError("News item not found", 404);
  }

  return item;
};

export const createAdminNews = async (input: CreateNewsInput, actorUserId: string) => {
  const normalizedSlug = normalizeSlug(input.slug);
  const normalizedStatus = input.status ?? ContentStatus.DRAFT;
  const publishedAt =
    normalizedStatus === ContentStatus.PUBLISHED
      ? input.publishedAt ?? new Date()
      : input.publishedAt ?? null;

  const item = await prisma.news.create({
    data: {
      slug: normalizedSlug,
      titleAr: input.titleAr,
      titleEn: input.titleEn,
      contentAr: input.contentAr,
      contentEn: input.contentEn,
      ...(input.excerptAr !== undefined ? { excerptAr: input.excerptAr } : {}),
      ...(input.excerptEn !== undefined ? { excerptEn: input.excerptEn } : {}),
      ...(input.categoryAr !== undefined ? { categoryAr: input.categoryAr } : {}),
      ...(input.categoryEn !== undefined ? { categoryEn: input.categoryEn } : {}),
      ...(input.featuredImageUrl !== undefined
        ? { featuredImageUrl: input.featuredImageUrl }
        : {}),
      ...(input.seoTitleAr !== undefined ? { seoTitleAr: input.seoTitleAr } : {}),
      ...(input.seoTitleEn !== undefined ? { seoTitleEn: input.seoTitleEn } : {}),
      ...(input.seoDescriptionAr !== undefined
        ? { seoDescriptionAr: input.seoDescriptionAr }
        : {}),
      ...(input.seoDescriptionEn !== undefined
        ? { seoDescriptionEn: input.seoDescriptionEn }
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

export const updateAdminNews = async (
  id: string,
  input: UpdateNewsInput,
  actorUserId: string
) => {
  const existing = await prisma.news.findUnique({ where: { id } });

  if (!existing) {
    throw new AppError("News item not found", 404);
  }

  const status = input.status ?? existing.status;

  const data: Prisma.NewsUpdateInput = {
    ...(input.slug ? { slug: normalizeSlug(input.slug) } : {}),
    ...(input.titleAr ? { titleAr: input.titleAr } : {}),
    ...(input.titleEn ? { titleEn: input.titleEn } : {}),
    ...(input.contentAr ? { contentAr: input.contentAr } : {}),
    ...(input.contentEn ? { contentEn: input.contentEn } : {}),
    ...(input.excerptAr !== undefined ? { excerptAr: input.excerptAr } : {}),
    ...(input.excerptEn !== undefined ? { excerptEn: input.excerptEn } : {}),
    ...(input.categoryAr !== undefined ? { categoryAr: input.categoryAr } : {}),
    ...(input.categoryEn !== undefined ? { categoryEn: input.categoryEn } : {}),
    ...(input.featuredImageUrl !== undefined
      ? { featuredImageUrl: input.featuredImageUrl }
      : {}),
    ...(input.seoTitleAr !== undefined ? { seoTitleAr: input.seoTitleAr } : {}),
    ...(input.seoTitleEn !== undefined ? { seoTitleEn: input.seoTitleEn } : {}),
    ...(input.seoDescriptionAr !== undefined
      ? { seoDescriptionAr: input.seoDescriptionAr }
      : {}),
    ...(input.seoDescriptionEn !== undefined
      ? { seoDescriptionEn: input.seoDescriptionEn }
      : {}),
    ...(input.status ? { status: input.status } : {}),
    ...(input.publishedAt !== undefined ? { publishedAt: input.publishedAt } : {}),
    updatedBy: { connect: { id: actorUserId } },
  };

  if (status === ContentStatus.PUBLISHED && !existing.publishedAt && input.publishedAt === undefined) {
    data.publishedAt = new Date();
  }

  const item = await prisma.news.update({
    where: { id },
    data,
    include: {
      createdBy: { select: { id: true, fullName: true, email: true } },
      updatedBy: { select: { id: true, fullName: true, email: true } },
    },
  });

  return item;
};

export const archiveAdminNews = async (id: string, actorUserId: string) => {
  const item = await prisma.news.update({
    where: { id },
    data: {
      status: ContentStatus.ARCHIVED,
      updatedBy: { connect: { id: actorUserId } },
    },
    include: {
      createdBy: { select: { id: true, fullName: true, email: true } },
      updatedBy: { select: { id: true, fullName: true, email: true } },
    },
  });

  return item;
};
