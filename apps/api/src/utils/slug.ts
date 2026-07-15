import { AppError } from "./app-error";

export const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const normalizeSlug = (input: string): string => {
  const normalized = input
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  if (!normalized || !slugPattern.test(normalized)) {
    throw new AppError("Invalid slug format", 400, [
      "Slug must be lowercase letters, numbers, and hyphens only",
    ]);
  }

  return normalized;
};
