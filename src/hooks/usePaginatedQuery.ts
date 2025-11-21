import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { IBackendRes, IModelPaginate } from "../types/backend";
import apiClient from "@/services/apiClient";

export const usePaginatedQuery = <T>(
  key: string,
  url: string,
  queryString: string
) => {
  return useQuery<IModelPaginate<T>, Error>({
    queryKey: [key, queryString],
    queryFn: async () => {
      const res = await apiClient.get<IBackendRes<IModelPaginate<T>>>(
        `${url}?${queryString}`
      );

      if (res.statusCode !== 200 || !res.data) {
        throw new Error((res.error as string) || "Failed to fetch data");
      }

      return res.data;
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60,
  });
};
