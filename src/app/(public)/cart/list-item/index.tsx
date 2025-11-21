import useCartStore from "@/store/cartStore";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Col } from "antd";
import React from "react";
import CartItem from "../cart-item";

const ListItemSection = () => {
  const { items, clearCart } = useCartStore();

  return (
    <Col xs={24} lg={16}>
      <div className="flex justify-between items-center mb-4">
        <span className="text-base sm:text-lg">Cart Items</span>
        <Button
          type="text"
          danger
          onClick={clearCart}
          disabled={items.length === 0}
          size="small"
          className="text-xs sm:text-sm"
        >
          <DeleteOutlined /> Clear Cart
        </Button>
      </div>

      {items.map((item) => (
        <CartItem key={item.vaccine.id} item={item} />
      ))}
    </Col>
  );
};

export default ListItemSection;
