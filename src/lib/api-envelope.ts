export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type ApiEnvelope<T> = {
  statusCode?: number;
  status?: string;
  message?: string;
  data: T;
  meta?: PaginationMeta | Record<string, unknown>;
};
