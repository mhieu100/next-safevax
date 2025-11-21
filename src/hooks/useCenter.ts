import { usePaginatedQuery } from "./usePaginatedQuery";
import { buildQuery } from "@/utils/buildQuery";
import { BuildQueryParams, ICenter } from "@/types/backend";

export const useCenter = (filter: BuildQueryParams) => {
  const query = buildQuery(filter);
  return usePaginatedQuery<ICenter>("centers", "/centers", query);
};
