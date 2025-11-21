"use client";

import React from "react";
import { Result, Button, Typography } from "antd";
import { CloseCircleOutlined, HomeOutlined, ReloadOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { Title, Paragraph } = Typography;

const Cancel = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push("/");
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleTryAgain = () => {
    router.push("/vaccine");
  };

  const handleViewProfile = () => {
    router.push("/profile");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-rose-100 p-6">
      <Result
        icon={
          <CloseCircleOutlined className="text-6xl md:text-8xl text-red-500" />
        }
        status="error"
        title={
          <Title level={2} className="text-gray-800 font-bold m-0">
            Operation Cancelled
          </Title>
        }
        subTitle={
          <div className="mb-8">
            <Paragraph className="text-base text-gray-600 m-0">
              Your booking or transaction has been cancelled.
            </Paragraph>
            <Paragraph className="text-sm text-gray-500 mt-2">
              Don&apos;t worry, you can try again anytime or explore other vaccination options.
            </Paragraph>
          </div>
        }
        extra={
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              type="primary"
              icon={<HomeOutlined />}
              onClick={handleGoHome}
              className="bg-red-600 hover:bg-red-700 border-red-600 w-full sm:w-auto"
            >
              Go Home
            </Button>
            <Button
              icon={<ReloadOutlined />}
              onClick={handleTryAgain}
              className="hover:border-red-600 hover:text-red-600 w-full sm:w-auto"
            >
              Try Again
            </Button>
            <Button
              onClick={handleGoBack}
              className="hover:border-red-600 hover:text-red-600 w-full sm:w-auto"
            >
              Go Back
            </Button>
            <Button
              onClick={handleViewProfile}
              className="hover:border-red-600 hover:text-red-600 w-full sm:w-auto"
            >
              View Profile
            </Button>
          </div>
        }
        className="bg-white rounded-2xl shadow-2xl p-12 max-w-2xl w-full"
      />
    </div>
  );
};

export default Cancel;
