export interface PaginationInput {
  page: number;
  limit: number;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export const toPagination = ({ page, limit }: PaginationInput) => {
  const skip = (page - 1) * limit;
  const take = limit;

  return { skip, take };
};

export const toPaginationMeta = (
  input: PaginationInput,
  total: number
): PaginationMeta => {
  return {
    page: input.page,
    limit: input.limit,
    total,
    totalPages: Math.max(1, Math.ceil(total / input.limit)),
  };
};
