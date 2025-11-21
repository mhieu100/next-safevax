import useCartStore from "@/store/cartStore";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

const TopCartSection = () => {
  const router = useRouter();
  const { totalQuantity } = useCartStore();
  return (
    <div className="flex justify-between items-center gap-2 sm:gap-4 mb-4">
      <span className="mb-0 text-lg sm:text-xl">
        <span className="hidden sm:inline">
          Shopping Cart ({totalQuantity()} items)
        </span>
        <span className="sm:hidden">Cart ({totalQuantity()})</span>
      </span>
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={() => router.push("/vaccine")}
        className="flex-shrink-0"
      >
        <span className="hidden sm:inline">Continue Shopping</span>
        <span className="sm:hidden">Back</span>
      </Button>
    </div>
  );
};

export default TopCartSection;
