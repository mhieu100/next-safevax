"use client";
import { IMeta } from "@/types/backend";
import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import { Button, Divider, Pagination, Space } from "antd";

interface TopFilterProps {
  meta: IMeta;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  pageSize: number;
  setPageSize: (pageSize: number) => void;
  viewMode: string;
  setViewMode: (viewMode: string) => void;
}

const TopFilterSection = ({
  meta,
  pageSize,
  setPageSize,
  currentPage,
  setCurrentPage,
  viewMode,
  setViewMode,
}: TopFilterProps) => {
  const handlePageChange = (page: number, size: number) => {
    setCurrentPage(page);
    if (size !== pageSize) {
      setPageSize(size);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="mb-6 flex justify-between items-center">
      <span className="text-lg font-medium text-gray-700">
        {meta.total} vaccine
        {true ? "s" : ""} found
      </span>
      <div className="flex items-center">
        <Pagination
          current={currentPage}
          total={meta.total}
          pageSize={pageSize}
          onChange={handlePageChange}
          onShowSizeChange={handlePageChange}
          pageSizeOptions={["8", "12", "24", "48"]}
          className="text-center"
        />

        <Divider type="vertical" className="h-8" />

        <Space.Compact>
          <Button
            icon={<AppstoreOutlined />}
            type={viewMode === "grid" ? "primary" : "default"}
            onClick={() => setViewMode("grid")}
            className="shadow-sm"
          />
          <Button
            icon={<BarsOutlined />}
            type={viewMode === "list" ? "primary" : "default"}
            onClick={() => setViewMode("list")}
            className="shadow-sm"
          />
        </Space.Compact>
      </div>
    </div>
  );
};

export default TopFilterSection;
