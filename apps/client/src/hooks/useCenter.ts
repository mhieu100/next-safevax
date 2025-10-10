import { usePaginatedQuery } from "./usePaginatedQuery";
import { buildQuery } from "@/utils/buildQuery";
import { BuildQueryParams, ICenter } from "@/types/backend";
import { FamilyMember } from "@/app/(private)/profile/components/FamilyManagerTab";

export const useCenter = (filter: BuildQueryParams) => {
  const query = buildQuery(filter);
  return usePaginatedQuery<ICenter>("centers", "/centers", query);
};
