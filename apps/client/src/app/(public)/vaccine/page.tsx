"use client";

import LeftFilterSection from "@/components/filter/left.filter";
import TopFilterSection from "@/components/filter/top.filter";
import ListVaccineSection from "@/components/list/list.vaccine";
import QuickStatsSection from "@/components/quick-stats/page";
import { MAX_PRICE, MIN_PRICE } from "@/constants";
import { useVaccine } from "@/hooks/useVaccine";
import { BuildQueryParams } from "@/types/backend";
import { Skeleton } from "antd";
import React, { useState } from "react";

const Vaccine = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [coutry, setCountry] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    MIN_PRICE,
    MAX_PRICE,
  ]);

  const sort: Record<string, "ascend" | "descend"> = {};
  if (sortBy) {
    const [field, direction] = sortBy.split("-") as [string, string];
    sort[field] = direction === "ascend" ? "ascend" : "descend";
  }

  const filter: BuildQueryParams = {
    current: currentPage,
    pageSize: pageSize,
    filters: { price: priceRange, country: coutry },
    sort,
  };

  const { data } = useVaccine(filter);

  return (
    <div className="my-5 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row gap-6">
        {!data ? (
          <Skeleton />
        ) : (
          <>
            <aside className="md:w-64 sticky top-[88px] self-start h-[calc(100vh-88px)] overflow-y-auto">
              <LeftFilterSection
                coutry={coutry}
                setCountry={setCountry}
                sortBy={sortBy}
                setSortBy={setSortBy}
                setPriceRange={setPriceRange}
              />
            </aside>
            <main className="flex-1 min-w-0">
              <TopFilterSection
                meta={data?.meta ?? undefined}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pageSize={pageSize}
                setPageSize={setPageSize}
                viewMode={viewMode}
                setViewMode={setViewMode}
              />
              <ListVaccineSection vaccines={data.result} viewMode={viewMode} />
              <QuickStatsSection />
            </main>
          </>
        )}
      </div>
    </div>
  );
};

export default Vaccine;
