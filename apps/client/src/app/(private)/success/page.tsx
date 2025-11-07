"use client";

import React, { useEffect, useState } from "react";
import { Result, Button, Typography, Spin, message } from "antd";
import { CheckCircleOutlined, HomeOutlined, LoadingOutlined } from "@ant-design/icons";
import { useRouter, useSearchParams } from "next/navigation";
import { callUpdatePaymentPaypal } from "@/services/payment.service";

const { Title, Paragraph } = Typography;

const Success = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [paymentUpdated, setPaymentUpdated] = useState(false);

  const searchParams = useSearchParams();
  const referenceId = searchParams.get("referenceId");
  const type = searchParams.get("type");
  const paymentId = searchParams.get("payment");

  useEffect(() => {
    const updatePayment = async () => {
      if (!paymentId || !referenceId || !type) {
        setPaymentUpdated(true); 
        return;
      }

      try {
        setLoading(true);
        
        const payload = {
          paymentId: Number(paymentId),
          referenceId: Number(referenceId),
          type: type.toUpperCase() as "BOOKING" | "ORDER",
        };

        await callUpdatePaymentPaypal(payload);
        
        setPaymentUpdated(true);
        message.success("Payment updated successfully!");
      } catch (error) {
        console.error("Failed to update payment:", error);
        message.error("Failed to update payment status. Please contact support.");
      } finally {
        setLoading(false);
      }
    };

    updatePayment();
  }, [paymentId, referenceId, type]);

  const handleGoHome = () => {
    router.push("/");
  };

  const handleViewVaccines = () => {
    router.push("/vaccine");
  };

  // Hiển thị loading nếu đang cập nhật payment
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-6">
        <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-2xl w-full text-center">
          <Spin size="large" indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
          <Title level={3} className="mt-6 text-gray-700">
            Processing Payment...
          </Title>
          <Paragraph className="text-gray-500">
            Please wait while we confirm your payment.
          </Paragraph>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-6">
      <Result
        icon={
          <CheckCircleOutlined className="text-6xl md:text-8xl text-green-500" />
        }
        status="success"
        title={
          <Title level={2} className="text-gray-800 font-bold m-0">
            {paymentUpdated ? "Payment Successful!" : "Success!"}
          </Title>
        }
        subTitle={
          <div className="mb-8">
            <Paragraph className="text-base text-gray-600 m-0">
              {paymentUpdated 
                ? "Your payment has been processed successfully."
                : "Your operation has been completed successfully."
              }
            </Paragraph>
            {paymentId && referenceId && (
              <div className="mt-4 p-4 bg-green-50 rounded-lg">
                <Paragraph className="text-sm text-gray-600 m-0">
                  <strong>Payment ID:</strong> {paymentId}
                </Paragraph>
                <Paragraph className="text-sm text-gray-600 m-0">
                  <strong>Reference ID:</strong> {referenceId}
                </Paragraph>
                {type && (
                  <Paragraph className="text-sm text-gray-600 m-0">
                    <strong>Type:</strong> {type.toUpperCase()}
                  </Paragraph>
                )}
              </div>
            )}
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
