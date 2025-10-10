import { useMessage } from "@/components/share/MessageProvider";
import useCartStore from "@/store/cartStore";
import { formatPrice } from "@/utils/formatPrice";
import {
  CheckCircleOutlined,
  GiftOutlined,
  LockOutlined,
  SafetyOutlined,
} from "@ant-design/icons";
import { Card, Button, Input, Divider, Image } from "antd";
import { useState } from "react";

interface SumaryProps {
  discount: number;
  setDiscount: (discount: number) => void;
  subtotal: number;
  shippingCost: number;
  tax: number;
  discountAmount: number;
  finalTotal: number;
}

const SumarySection = ({
  discount,
  setDiscount,
  subtotal,
  shippingCost,
  tax,
  discountAmount,
  finalTotal,
}: SumaryProps) => {
  const { success, error } = useMessage();

  const { items, totalQuantity } = useCartStore();
  const [promoCode, setPromoCode] = useState("");

  const handlePromoCode = () => {
    const validCodes: { [key: string]: number } = {
      SAVE10: 10,
      WELCOME15: 15,
      FIRST20: 20,
    };

    const upperCode = promoCode.toUpperCase();
    const discountValue = validCodes[upperCode];

    if (discountValue) {
      setDiscount(discountValue);
      success(`Promo code applied! ${discountValue}% discount`);
    } else {
      error("Invalid promo code");
    }
  };

  return (
    <Card className="rounded-xl shadow-sm border-0 sticky top-6">
      <p className="mb-5">Order Summary</p>

      <div className="space-y-3 mb-6">
        {items.map((item) => (
          <div key={item.vaccine.id} className="flex items-center gap-3">
            <Image
              src={item.vaccine.image}
              alt={item.vaccine.name}
              className="!w-14 !h-14 !object-cover !rounded-lg"
            />
            <div className="flex-1 min-w-0">
              <span className="text-sm font-medium block truncate">
                {item.vaccine.name}
              </span>
              <span className="text-xs">Qty: {item.quantity}</span>
            </div>
            <span className="text-sm font-medium">
              {formatPrice(item.vaccine.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      <Divider />

      <div className="mb-6">
        <span className="block mb-2">Promo Code</span>
        <div className="flex gap-2">
          <Input
            placeholder="Enter code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            prefix={<GiftOutlined />}
          />
          <Button onClick={handlePromoCode}>Apply</Button>
        </div>
        {discount > 0 && (
          <span className="text-sm block mt-1">
            {discount}% discount applied!
          </span>
        )}
      </div>

      <Divider />

      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span>Subtotal ({totalQuantity()} items)</span>
          <span>{formatPrice(subtotal)}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>
          <span>
            {shippingCost === 0 ? (
              <span className="text-green-600">FREE</span>
            ) : (
              `$${shippingCost.toFixed(2)}`
            )}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Tax</span>
          <span>{formatPrice(tax)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount ({discount}%)</span>
            <span>-{formatPrice(discountAmount)}</span>
          </div>
        )}
      </div>

      <Divider />

      <div className="flex justify-between items-center mb-6">
        <span className="mb-0">Total</span>
        <span className="mb-0 text-blue-600">{formatPrice(finalTotal)}</span>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center justify-center gap-4 text-center">
          <div className="flex flex-col items-center">
            <LockOutlined className="text-green-600 text-lg mb-1" />
            <span className="text-xs">SSL Secure</span>
          </div>
          <div className="flex flex-col items-center">
            <SafetyOutlined className="text-blue-600 text-lg mb-1" />
            <span className="text-xs">Safe Payment</span>
          </div>
          <div className="flex flex-col items-center">
            <CheckCircleOutlined className="text-green-600 text-lg mb-1" />
            <span className="text-xs">Guaranteed</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SumarySection;
