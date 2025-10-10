import { CreditCardOutlined } from "@ant-design/icons";
import { Card, Button, Radio, Typography, FormInstance } from "antd";
import { paymentMethods } from "@/components/payment";
import MetaMaskMethod from "@/components/payment/metamask";
import BankMethod from "@/components/payment/bank";
import PaypalMethod from "@/components/payment/paypal";

const { Title, Text } = Typography;
interface PaymentProps {
  selectedPayment: string;
  setSelectedPayment: (selectedPayment: string) => void;
  paymentForm: FormInstance;
  setCurrentStep: (currentStep: number) => void;
}
const PaymentSection = ({
  selectedPayment,
  setSelectedPayment,
  paymentForm,
  setCurrentStep,
}: PaymentProps) => {
  const handlePaymentNext = async () => {
    try {
      await paymentForm.validateFields();
      setCurrentStep(2);
    } catch (error) {
      console.log("Validation failed:", error);
    }
  };

  return (
    <Card className="rounded-xl shadow-sm border-0">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
          <CreditCardOutlined className="text-green-600" />
        </div>
        <Title level={3} className="mb-0">
          Payment Information
        </Title>
      </div>

      {/* Payment Methods */}
      <div className="mb-8">
        <Title level={4} className="mb-4">
          Payment Method
        </Title>
        <Radio.Group
          value={selectedPayment}
          onChange={(e) => setSelectedPayment(e.target.value)}
          className="w-full"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {paymentMethods.map((method) => (
              <Radio.Button
                key={method.id}
                value={method.id}
                className="!h-auto p-0 border-gray-200"
              >
                <div className="p-4 text-center">
                  <div className="text-2xl text-blue-600 mb-2">
                    {method.icon}
                  </div>
                  <Text strong className="block">
                    {method.name}
                  </Text>
                  <Text type="secondary" className="text-xs">
                    {method.description}
                  </Text>
                </div>
              </Radio.Button>
            ))}
          </div>
        </Radio.Group>
      </div>

      {selectedPayment === "PAYPAL" && <PaypalMethod />}
      {selectedPayment === "METAMASK" && <MetaMaskMethod />}
      {selectedPayment === "BANK" && <BankMethod />}

      <div className="flex justify-between mt-8">
        <Button onClick={() => setCurrentStep(0)} className="px-8 rounded-lg">
          Back to Shipping
        </Button>
        <Button
          type="primary"
          onClick={handlePaymentNext}
          className="px-8 rounded-lg"
        >
          Review Order
        </Button>
      </div>
    </Card>
  );
};

export default PaymentSection;
