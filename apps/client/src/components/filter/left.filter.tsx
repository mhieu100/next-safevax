"use client";

import { callFetchCountry } from "@/services/vaccine.service";
import {
  ClearOutlined,
  FilterOutlined,
  SortAscendingOutlined,
} from "@ant-design/icons";
import { Button, Divider, Select, Slider } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import debounce from "lodash/debounce";
import { MAX_PRICE, MIN_PRICE } from "@/constants";
import { formatPrice } from "@/utils/formatPrice";

const { Option } = Select;

interface LeftFilterProps {
  setPriceRange: (priceRange: [number, number]) => void;
  coutry: string[];
  setCountry: (coutry: string[]) => void;
  sortBy: string | null;
  setSortBy: (sortBy: string | null) => void;
}
const LeftFilterSection = ({
  setPriceRange,
  coutry,
  setCountry,
  sortBy,
  setSortBy,
}: LeftFilterProps) => {
  const [coutries, setCountries] = useState<string[]>([]);
  const [sliderRange, setSliderRange] = useState<[number, number]>([
    MIN_PRICE,
    MAX_PRICE,
  ]);

  const handleCountryChange = (value: string[]) => {
    setCountry(value);
  };

  useEffect(() => {
    const handleFetchCountries = async () => {
      const response = await callFetchCountry();
      if (response && response.data) {
        setCountries(response.data);
      }
    };
    handleFetchCountries();
  }, []);

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  const debouncedSetPriceRange = useMemo(
    () =>
      debounce((value: number[]) => {
        setPriceRange([value[0] ?? MIN_PRICE, value[1] ?? MAX_PRICE]);
      }, 300),
    [setPriceRange]
  );

  const handlePriceRangeChange = (value: number[]) => {
    setSliderRange([value[0] ?? MIN_PRICE, value[1] ?? MAX_PRICE]);
    debouncedSetPriceRange(value);
  };

  useEffect(() => {
    return () => {
      debouncedSetPriceRange.cancel();
    };
  }, [debouncedSetPriceRange]);

  const clearAllFilters = () => {
    setSortBy(null);
    setCountry([]);
    setPriceRange([MIN_PRICE, MAX_PRICE]);
    setSliderRange([MIN_PRICE, MAX_PRICE]);
  };

  return (
    <div className="hidden md:block sticky w-64 flex-shrink-0">
      <div className="bg-amber-50 p-6 rounded-lg shadow-sm top-6">
        <h3 className="text-lg font-bold mb-6">
          <FilterOutlined /> Filters
        </h3>

        <div className="mb-8">
          <div className="flex flex-wrap gap-3 items-center">
            <Select
              mode="multiple"
              placeholder="Select Country"
              allowClear
              style={{ width: "100%" }}
              value={coutry}
              onChange={handleCountryChange}
              className="shadow-sm"
            >
              {coutries.map((country) => (
                <Option key={country} value={country}>
                  {country}
                </Option>
              ))}
            </Select>

            <Select
              placeholder="Sort by"
              style={{ width: "100%" }}
              value={sortBy}
              onChange={handleSortChange}
              suffixIcon={<SortAscendingOutlined />}
              className="shadow-sm"
            >
              <Option value="price-ascend">Price: Low to High</Option>
              <Option value="price-descend">Price: High to Low</Option>
              <Option value="name-ascend">Name A-Z</Option>
              <Option value="name-descend">Name Z-A</Option>
            </Select>
          </div>
        </div>
        <h3 className="text-lg font-bold mb-6">Price Range</h3>
        <div className="p-2 rounded-lg">
          <Slider
            range
            min={MIN_PRICE}
            max={MAX_PRICE}
            value={sliderRange}
            onChange={handlePriceRangeChange}
            marks={{
              0: "0",
              1000000: "1tr",
              2000000: "2tr",
              3000000: "3tr",
            }}
          />
          <div className="text-center text-sm text-gray-500 bg-white px-2 py-1 rounded">
            {formatPrice(sliderRange[0])} - ${formatPrice(sliderRange[1])}
          </div>
        </div>
        <Divider />
        <Button
          type="primary"
          size="small"
          onClick={clearAllFilters}
          icon={<ClearOutlined />}
          className="w-full"
          danger
        >
          Clear All
        </Button>
      </div>
    </div>
  );
};

export default LeftFilterSection;
