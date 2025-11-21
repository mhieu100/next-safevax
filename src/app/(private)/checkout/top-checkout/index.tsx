"use client";
import {
  ArrowLeftOutlined,
  CheckCircleOutlined,
  CreditCardOutlined,
  LockOutlined,
  TruckOutlined,
} from "@ant-design/icons";
import { Button, Card, Steps } from "antd";
import { useRouter } from "next/navigation";

const { Step } = Steps;

interface TopChekoutProps {
    currentStep: number,
    setCurrentStep: (currentStep: number) => void
}

const TopChekoutSection = ({ currentStep, setCurrentStep} : TopChekoutProps) => {
  const router = useRouter();

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center gap-4 mb-6">
        <div>
          <span className="font-semibold text-2xl mb-0">Secure Checkout</span>
          <span className="flex items-center gap-1 text-blue-400">
            <LockOutlined /> SSL Encrypted & Secure
          </span>
        </div>
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => router.push("/cart")}
          className="rounded-lg"
        >
          Back to Cart
        </Button>
      </div>

      <Card className="rounded-xl shadow-sm border-0">
        <Steps
          
          current={currentStep}
          onChange={(value) => setCurrentStep(value)}
          className="checkout-steps"
        >
          <Step
            title="Shipping"
            icon={<TruckOutlined />}
            description="Delivery information"
          />
          <Step
            title="Payment"
            icon={<CreditCardOutlined />}
            description="Payment method"
          />
          <Step
            title="Review"
            icon={<CheckCircleOutlined />}
            description="Confirm order"
          />
        </Steps>
      </Card>
    </div>
  );
};

export default TopChekoutSection;
