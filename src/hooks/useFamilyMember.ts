import { usePaginatedQuery } from "./usePaginatedQuery";
import { buildQuery } from "@/utils/buildQuery";
import { BuildQueryParams } from "@/types/backend";
import { FamilyMember } from "@/app/(private)/profile/components/family-manager-tab";

export const useFamilyMember = (filter: BuildQueryParams) => {
  const query = buildQuery(filter);
  return usePaginatedQuery<FamilyMember>("family-members", "/api/family-members", query);
};
