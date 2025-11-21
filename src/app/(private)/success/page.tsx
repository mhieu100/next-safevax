"use client";

import { Result, Button, Typography } from "antd";
import { CheckCircleOutlined, HomeOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { Title, Paragraph } = Typography;

const Success = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push("/");
  };

  const handleViewVaccines = () => {
    router.push("/vaccine");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-6">
      <Result
        icon={
          <CheckCircleOutlined className="text-6xl md:text-8xl text-green-500" />
        }
        status="success"
        title={
          <Title level={2} className="text-gray-800 font-bold m-0">
            Payment Successful!
          </Title>
        }
        subTitle={
          <div className="mb-8">
            <Paragraph className="text-base text-gray-600 m-0">
              Your operation has been completed successfully.
            </Paragraph>

            <Paragraph className="text-sm text-gray-500 mt-4">
              Thank you for using SafeVax vaccination system.
            </Paragraph>
          </div>
        }
        extra={
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              type="primary"
              icon={<HomeOutlined />}
              onClick={handleGoHome}
              className="bg-green-600 hover:bg-green-700 border-green-600 w-full sm:w-auto"
            >
              Go Home
            </Button>
            <Button
              onClick={handleViewVaccines}
              className="hover:border-green-600 hover:text-green-600 w-full sm:w-auto"
            >
              View Vaccines
            </Button>
          </div>
        }
        className="bg-white rounded-2xl shadow-2xl p-12 max-w-2xl w-full"
      />
    </div>
  );
};

export default Success;
