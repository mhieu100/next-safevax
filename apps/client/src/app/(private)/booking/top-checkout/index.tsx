"use client";
import {
  ArrowLeftOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  CreditCardOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { Button, Card, Steps } from "antd";
import { useRouter } from "next/navigation";

const { Step } = Steps;

interface TopChekoutProps {
  currentStep: number;
  setCurrentStep: (currentStep: number) => void;
}

const TopChekoutSection = ({
  currentStep,
  setCurrentStep,
}: TopChekoutProps) => {
  const router = useRouter();

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center gap-4 mb-6">
        <div>
          <span className="font-semibold text-2xl mb-0">Create Booking</span>
          <span className="flex items-center gap-1 text-blue-400">
            <LockOutlined /> SSL Encrypted & Secure
          </span>
        </div>
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => router.push("/")}
          className="rounded-lg"
        >
          Cancel booking
        </Button>
      </div>

      <Card className="rounded-xl shadow-sm border-0">
        <Steps
          current={currentStep}
          onChange={(value) => setCurrentStep(value)}
          className="checkout-steps"
        >
          <Step
            title="Appointment"
            icon={<CalendarOutlined />}
            description="Appoint information"
          />
          <Step
            title="Payment"
            icon={<CreditCardOutlined />}
            description="Payment method"
          />
          <Step
            title="Review"
            icon={<CheckCircleOutlined />}
            description="Confirm booking"
          />
        </Steps>
      </Card>
    </div>
  );
};

export default TopChekoutSection;
