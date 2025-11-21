"use client";

import React from "react";
import VaccineCard from "../card/card.vaccine";
import VaccineModeCard from "../card/card.mode.vaccine";
import { IVaccine } from "@/types/backend";

interface ListVaccineProps {
  viewMode: string;
  vaccines: IVaccine[];
}

const ListVaccineSection = ({ vaccines, viewMode }: ListVaccineProps) => {
  return (
    <>
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2"
            : "flex flex-col gap-4"
        }
      >
        {vaccines &&
          vaccines.map((vaccine) =>
            viewMode === "grid" ? (
              <VaccineCard key={vaccine.id} vaccine={vaccine} />
            ) : (
              <VaccineModeCard key={vaccine.id} vaccine={vaccine} />
            )
          )}
      </div>
    </>
  );
};

export default ListVaccineSection;
