"use client";

import { useAuthStore } from "@/store/authStore";
import useCartStore from "@/store/cartStore";
import { formatPrice } from "@/utils/formatPrice";
import { Button, Card, Col, Divider } from "antd";
import { useRouter } from "next/navigation";

const SumarySection = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { totalQuantity, totalPrice } = useCartStore();

  const handleCheckout = () => {
    if (isAuthenticated) {
      router.push("/checkout");
    } else {
      router.push("/login");
    }
  };

  return (
    <Col xs={24} lg={8}>
      <Card
        title="Order Summary"
        className="hidden sm:block rounded-xl sticky top-6 shadow-sm border-0"
      >
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">
              Subtotal ({totalQuantity()} items)
            </span>
            <span className="font-medium">
              {formatPrice(totalPrice() as number)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Shipping</span>
            <span className="font-medium">
              {totalPrice() > 1000000 ? (
                <span className="text-green-600">Free</span>
              ) : (
                "100.000đ"
              )}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Tax (10%)</span>
            <span className="font-medium">
              {formatPrice((totalPrice() * 0.1) as number)}
            </span>
          </div>

          {totalPrice() > 50 && (
            <div className="bg-green-50 p-3 rounded-lg border border-green-200">
              <span className="text-green-700 text-sm">
                🎉 You saved 100.000đ on shipping!
              </span>
            </div>
          )}

          <Divider className="my-4" />

          <div className="flex justify-between items-center">
            <span className="mb-0">Total</span>
            <span className="text-blue-600 mb-0">
              {formatPrice(
                totalPrice() +
                  (totalPrice() > 1000000 ? 0 : 100000) +
                  totalPrice() * 0.1
              )}
            </span>
          </div>

          <Button
            type="primary"
            onClick={handleCheckout}
            className="w-full h-12 text-base font-semibold rounded-lg mt-4"
          >
            Proceed to Checkout
          </Button>

          <div className="text-center mt-3">
            <span className="text-sm">
              🔒 Secure checkout with SSL encryption
            </span>
          </div>
        </div>
      </Card>
    </Col>
  );
};

export default SumarySection;
