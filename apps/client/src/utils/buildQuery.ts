/* eslint-disable @typescript-eslint/no-explicit-any */
import { sfLike, sfGt, sfLt } from "spring-filter-query-builder";
import queryString from "query-string";
import { BuildQueryParams } from "@/types/backend";


export const buildQuery = ({
  current = 1,
  pageSize = 10,
  filters = {},
  sort = {},
}: BuildQueryParams) => {
  const q: any = {
    page: current,
    size: pageSize,
    filter: "",
  };

  const filterStrings: string[] = [];
  Object.entries(filters).forEach(([field, value]) => {
    if (field === "price" && value.length === 2) {
      const [min, max] = value;
      filterStrings.push(`(${sfGt(field, min)} and ${sfLt(field, max)})`);
    } else if (Array.isArray(value) && value.length > 0) {
      const orFilters = value.map((v) => sfLike(field, v)).join(" or ");
      filterStrings.push(`(${orFilters})`);
    } else if (value !== undefined && value !== null && value !== "") {
      filterStrings.push(sfLike(field, value).toString());
    }
  });

  if (filterStrings.length > 0) {
    q.filter = filterStrings.join(" and ");
  } else {
    delete q.filter;
  }

  let temp = queryString.stringify(q, {
    encode: false,
  });

  let sortBy = "";
  for (const [field, order] of Object.entries(sort)) {
    sortBy = order === "ascend" ? `sort=${field},asc` : `sort=${field},desc`;
  }

  if (!sortBy) {
    temp = `${temp}`;
  } else {
    temp = `${temp}&${sortBy}`;
  }

  return temp;
};

