import { usePaginatedQuery } from "./usePaginatedQuery";
import { buildQuery } from "@/utils/buildQuery";
import { BuildQueryParams, IVaccine } from "@/types/backend";

export const useVaccine = (filter: BuildQueryParams) => {
  const query = buildQuery(filter);
  return usePaginatedQuery<IVaccine>("vaccines", "/vaccines", query);
};
