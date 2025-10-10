"use client";

import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Breadcrumb } from "antd";
import { HomeOutlined, MenuOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { callGetBySku } from "@/services/vaccine.service";
import VaccineInfoSection from "@/app/(public)/vaccine/[id]/detail/info";
import DescriptionVaccineSection from "@/app/(public)/vaccine/[id]/detail/desc";
import { IVaccine } from "@/types/backend";

const VaccineDetail = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [vaccine, setVaccine] = useState<IVaccine>();

  useEffect(() => {
    const handleGetVaccine = async (sku: string) => {
      const response = await callGetBySku(sku);
      setVaccine(response.data);
    };
    if (typeof id === "string") {
      handleGetVaccine(id);
    }
  }, [id]);
  return (
    <div className="max-w-7xl mx-auto p-6 min-h-screen">
      <div className="mb-6">
        <Breadcrumb
          className="cursor-pointer"
          items={[
            {
              title: <HomeOutlined />,
              onClick: () => router.push("/"),
            },
            {
              title: <MenuOutlined />,
              onClick: () => router.push("/vaccine"),
            },
            {
              title: vaccine?.name,
            },
          ]}
        />
      </div>
      {vaccine && (
        <>
          <VaccineInfoSection vaccine={vaccine} />
          <DescriptionVaccineSection vaccine={vaccine} />
        </>
      )}
    </div>
  );
};

export default VaccineDetail;
