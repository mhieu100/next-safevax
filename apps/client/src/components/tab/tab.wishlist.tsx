import { Button, Card, Typography } from "antd";
import React from "react";

const { Title, Text } = Typography;

// Mock wishlist data
const wishlistItems = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: "$199.99",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: "$299.99",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop",
  },
];

const TabWishList = () => {
  return (
    <div className="py-4">
      <div className="flex justify-between items-center mb-6">
        <Title level={4}>My Wishlist</Title>
        <Button type="primary">Browse Products</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {wishlistItems.map((item) => (
          <Card key={item.id} className="rounded-lg">
            <div className="text-center">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-32 object-cover rounded-lg mb-3"
              />
              <Title level={5} className="mb-2">
                {item.name}
              </Title>
              <Text strong className="text-blue-600 text-lg">
                {item.price}
              </Text>
              <div className="mt-3 space-y-2">
                <Button type="primary" block>
                  Add to Cart
                </Button>
                <Button block>Remove</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TabWishList;
