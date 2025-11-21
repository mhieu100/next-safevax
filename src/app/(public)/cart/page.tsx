"use client";
import React from "react";
import EmptyCart from "./empty-cart";
import useCartStore from "@/store/cartStore";
import TopCartSection from "./top-cart";
import { Row } from "antd";
import ListItemSection from "./list-item";
import SumarySection from "./sumary";

const Cart = () => {
  const { items } = useCartStore();

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <TopCartSection />
        <Row gutter={[24, 24]}>
          <ListItemSection />
          <SumarySection />
        </Row>
      </div>
    </div>
  );
};

export default Cart;
