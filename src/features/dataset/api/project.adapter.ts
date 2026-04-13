import type { AxiosResponse } from "axios";

import { isApiEnvelope } from "@/lib/api-adapter";
import type { ApiEnvelope } from "@/lib/api-envelope";
import type {
  GetProjectResponse,
  GetProjectsResponse,
  ProjectDetails,
  Project,
} from "@/interfaces/project.interface";

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isPaginationMeta = (
  value: unknown,
): value is {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
} =>
  isObject(value) &&
  typeof value.page === "number" &&
  typeof value.limit === "number" &&
  typeof value.total === "number" &&
  typeof value.totalPages === "number";

const isProject = (value: unknown): value is Project =>
  isObject(value) && typeof value.id === "string" && typeof value.name === "string";

const isProjectsPayload = (
  value: unknown,
): value is {
  data: Project[];
  meta: { page: number; limit: number; total: number; totalPages: number };
} =>
  isObject(value) &&
  Array.isArray(value.data) &&
  value.data.every(isProject) &&
  isPaginationMeta(value.meta);

const isProjectDetails = (value: unknown): value is ProjectDetails =>
  isObject(value) &&
  isObject(value.workspace) &&
  isObject(value.project) &&
  Array.isArray(value.versions);

const isProjectsResponse = (value: unknown): value is GetProjectsResponse =>
  isObject(value) && isProjectsPayload(value.data);

const isProjectResponse = (value: unknown): value is GetProjectResponse =>
  isObject(value) && isProjectDetails(value.data);

const toProjectsResponse = (
  body: unknown,
  defaultMessage = "",
): GetProjectsResponse => {
  if (isProjectsResponse(body)) {
    return body;
  }

  if (isApiEnvelope<unknown>(body) && isProjectsPayload(body.data)) {
    return {
      statusCode: body.statusCode ?? 200,
      message: body.message ?? defaultMessage,
      data: body.data,
    };
  }

  if (isProjectsPayload(body)) {
    return {
      statusCode: 200,
      message: defaultMessage,
      data: body,
    };
  }

  throw new Error("Invalid projects response");
};

const toProjectResponse = (
  body: unknown,
  defaultMessage = "",
): GetProjectResponse => {
  if (isProjectResponse(body)) {
    return body;
  }

  if (isApiEnvelope<unknown>(body) && isProjectDetails(body.data)) {
    return {
      statusCode: body.statusCode ?? 200,
      message: body.message ?? defaultMessage,
      data: body.data,
    };
  }

  if (isProjectDetails(body)) {
    return {
      statusCode: 200,
      message: defaultMessage,
      data: body,
    };
  }

  throw new Error("Invalid project response");
};

export const projectAdapter = {
  toProjectsResponse: (
    response: AxiosResponse<
      | ApiEnvelope<GetProjectsResponse["data"]>
      | GetProjectsResponse
      | GetProjectsResponse["data"]
    >,
  ) => toProjectsResponse(response.data),
  toProjectResponse: (
    response: AxiosResponse<
      ApiEnvelope<ProjectDetails> | GetProjectResponse | ProjectDetails
    >,
  ) => toProjectResponse(response.data),
};
