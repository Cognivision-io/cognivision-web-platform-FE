export type ApiUsageDetailedLogEntry = {
  id: number;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  apiKey: string;
  modelId: string;
  endpoint: string;
  method: string;
  statusCode: number;
  responseTimeMs: number;
  creditsUsed: string | number;
  requestSize: string | number | null;
  responseSize: string | number | null;
  ipAddress: string;
  userAgent: string | null;
  errorMessage: string | null;
  metadata: unknown | null;
  rateLimited: boolean;
};

export type ApiUsageDetailedLogsResponse = {
  statusCode: number;
  data: {
    data: ApiUsageDetailedLogEntry[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  message: string;
};

export type ApiUsageSummaryPeriod = {
  start: string;
  end: string;
  granularity: string;
};

export type ApiUsageSummaryAggregationRow = {
  id: number;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  apiKey: string;
  aggregationType: string;
  periodStart: string;
  periodEnd: string;
  totalRequests: string;
  successfulRequests: string;
  failedRequests: string;
  rateLimitedRequests: string;
  totalCreditsUsed: string;
  avgResponseTimeMs: number;
  minResponseTimeMs: number;
  maxResponseTimeMs: number;
  totalRequestSize: string;
  totalResponseSize: string;
  errorSummary: unknown | null;
  endpointBreakdown: unknown | null;
};

export type ApiUsageWorkspaceSummary = {
  period: ApiUsageSummaryPeriod;
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  rateLimitedRequests: number;
  totalCreditsUsed: number;
  avgResponseTimeMs: number;
  data: ApiUsageSummaryAggregationRow[];
};

export type ApiUsageSummaryResponse = {
  statusCode: number;
  data: ApiUsageWorkspaceSummary;
  message: string;
};
