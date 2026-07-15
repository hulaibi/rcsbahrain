import { ContentStatus, Prisma } from "@prisma/client";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import {
  adminPageListQuerySchema,
  createPageSchema,
  updatePageSchema,
} from "../schemas/page.schema";
import { AppError } from "../utils/app-error";
import { toPagination, toPaginationMeta } from "../utils/pagination";
import { normalizeSlug } from "../utils/slug";

export type CreatePageInput = z.infer<typeof createPageSchema>;
export type UpdatePageInput = z.infer<typeof updatePageSchema>;
export type AdminPageListQuery = z.infer<typeof adminPageListQuerySchema>;
export type Locale = "ar" | "en";

const buildPublishedFilter = (): Prisma.PageWhereInput => ({
  status: ContentStatus.PUBLISHED,
  OR: [{ publishedAt: null }, { publishedAt: { lte: new Date() } }],
});

export const getPublicPageBySlug = async (slug: string, locale: Locale) => {
  const page = await prisma.page.findFirst({
    where: {
      slug,
      ...buildPublishedFilter(),
    },
  });

  if (!page) {
    return null;
  }

  return {
    id: page.id,
    slug: page.slug,
    title: locale === "ar" ? page.titleAr : page.titleEn,
    content: locale === "ar" ? page.contentAr : page.contentEn,
    excerpt: locale === "ar" ? page.excerptAr : page.excerptEn,
    featuredImageUrl: page.featuredImageUrl,
    publishedAt: page.publishedAt,
    updatedAt: page.updatedAt,
  };
};

export const listAdminPages = async (query: AdminPageListQuery) => {
  const { page, limit, search, status } = query;
  const { skip, take } = toPagination({ page, limit });

  const where: Prisma.PageWhereInput = {
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
    prisma.page.findMany({
      where,
      skip,
      take,
      orderBy: { updatedAt: "desc" },
      include: {
        createdBy: { select: { id: true, fullName: true, email: true } },
        updatedBy: { select: { id: true, fullName: true, email: true } },
      },
    }),
    prisma.page.count({ where }),
  ]);

  return {
    items,
    meta: toPaginationMeta({ page, limit }, total),
  };
};

export const getAdminPageById = async (id: string) => {
  const page = await prisma.page.findUnique({
    where: { id },
    include: {
      createdBy: { select: { id: true, fullName: true, email: true } },
      updatedBy: { select: { id: true, fullName: true, email: true } },
    },
  });

  if (!page) {
    throw new AppError("Page not found", 404);
  }

  return page;
};

export const createAdminPage = async (input: CreatePageInput, actorUserId: string) => {
  const normalizedSlug = normalizeSlug(input.slug);
  const normalizedStatus = input.status ?? ContentStatus.DRAFT;
  const publishedAt =
    normalizedStatus === ContentStatus.PUBLISHED
      ? input.publishedAt ?? new Date()
      : input.publishedAt ?? null;

  const page = await prisma.page.create({
    data: {
      slug: normalizedSlug,
      titleAr: input.titleAr,
      titleEn: input.titleEn,
      contentAr: input.contentAr,
      contentEn: input.contentEn,
      ...(input.excerptAr !== undefined ? { excerptAr: input.excerptAr } : {}),
      ...(input.excerptEn !== undefined ? { excerptEn: input.excerptEn } : {}),
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

  return page;
};

export const updateAdminPage = async (
  id: string,
  input: UpdatePageInput,
  actorUserId: string
) => {
  const existing = await prisma.page.findUnique({ where: { id } });

  if (!existing) {
    throw new AppError("Page not found", 404);
  }

  const status = input.status ?? existing.status;

  const data: Prisma.PageUpdateInput = {
    ...(input.slug ? { slug: normalizeSlug(input.slug) } : {}),
    ...(input.titleAr ? { titleAr: input.titleAr } : {}),
    ...(input.titleEn ? { titleEn: input.titleEn } : {}),
    ...(input.contentAr ? { contentAr: input.contentAr } : {}),
    ...(input.contentEn ? { contentEn: input.contentEn } : {}),
    ...(input.excerptAr !== undefined ? { excerptAr: input.excerptAr } : {}),
    ...(input.excerptEn !== undefined ? { excerptEn: input.excerptEn } : {}),
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

  const page = await prisma.page.update({
    where: { id },
    data,
    include: {
      createdBy: { select: { id: true, fullName: true, email: true } },
      updatedBy: { select: { id: true, fullName: true, email: true } },
    },
  });

  return page;
};

export const archiveAdminPage = async (id: string, actorUserId: string) => {
  const page = await prisma.page.update({
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

  return page;
};
