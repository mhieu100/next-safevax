import useCartStore from "@/store/cartStore";
import { CheckCircleOutlined } from "@ant-design/icons";
import { Card, Button, Typography, Checkbox, Image, FormInstance } from "antd";
import { formatPrice } from "@/utils/formatPrice";
import { paymentMethods } from "@/components/payment";

const { Title, Text } = Typography;

interface ReviewProps {
  loading: boolean
  finalTotal: number;
  selectedPayment: string;
  paymentForm: FormInstance;
  shippingForm: FormInstance;
  setCurrentStep: (currentStep: number) => void;
  handlePlaceOrder: () => void
}

const ReviewSection = ({
  loading,

  finalTotal,
  selectedPayment,
  paymentForm,
  shippingForm,
  setCurrentStep,
  handlePlaceOrder
}: ReviewProps) => {
  const { items } = useCartStore();
 
  

  return (
    <Card className="rounded-xl shadow-sm border-0">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
          <CheckCircleOutlined className="text-purple-600" />
        </div>
        <Title level={3} className="mb-0">
          Review Your Order
        </Title>
      </div>

      {/* Order Items */}
      <div className="mb-8">
        <Title level={4} className="mb-4">
          Order Items
        </Title>
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.vaccine.id}
              className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
            >
              <Image
                src={item.vaccine.image}
                alt={item.vaccine.name}
                className="!w-16 !h-16 !object-cover !rounded-lg"
              />
              <div className="flex-1">
                <span className="block">{item.vaccine.name}</span>
                <span className="text-sm">{item.vaccine.country}</span>
                <span className="text-sm">Qty: {item.quantity}</span>
              </div>
              <span className="text-lg">
                {formatPrice(item.vaccine.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg">
          <Title level={5} className="mb-3 text-blue-800">
            Shipping Address
          </Title>
          <div className="text-sm space-y-1">
            <div>
              {shippingForm.getFieldValue("firstName")}{" "}
              {shippingForm.getFieldValue("lastName")}
            </div>
            <div>{shippingForm.getFieldValue("address")}</div>
            <div>
              {shippingForm.getFieldValue("city")},{" "}
              {shippingForm.getFieldValue("state")}{" "}
              {shippingForm.getFieldValue("zipCode")}
            </div>
            <div>{shippingForm.getFieldValue("phone")}</div>
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <Title level={5} className="mb-3 text-green-800">
            Payment Method
          </Title>
          <div className="flex items-center gap-2">
            {paymentMethods.find((m) => m.id === selectedPayment)?.icon}
            <Text>
              {paymentMethods.find((m) => m.id === selectedPayment)?.name}
            </Text>
          </div>
          {selectedPayment === "card" && (
            <Text type="secondary" className="text-sm block mt-1">
              **** **** ****{" "}
              {paymentForm.getFieldValue("cardNumber")?.slice(-4)}
            </Text>
          )}
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-6">
        <Checkbox className="mb-2">
          I agree to the
          <Button type="link" className="p-0">
            Terms and Conditions
          </Button>
          and
          <Button type="link" className="p-0">
            Privacy Policy
          </Button>
        </Checkbox>
        <Checkbox>I want to receive promotional emails and updates</Checkbox>
      </div>

      <div className="flex justify-between">
        <Button onClick={() => setCurrentStep(1)} className="px-8 rounded-lg">
          Back to Payment
        </Button>
        <Button
          type="primary"
          loading={loading}
          onClick={handlePlaceOrder}
          className="px-8 rounded-lg bg-green-600 hover:bg-green-700"
        >
          {loading
            ? "Processing..."
            : `Place Order - ${formatPrice(finalTotal)}`}
        </Button>
      </div>
    </Card>
  );
};

export default ReviewSection;
