"use client";

import React, { useState } from "react";
import { Card, Form, Input, Button, Typography, Alert, Divider } from "antd";
import {
  MailOutlined,
  ArrowLeftOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { Title, Text, Link } = Typography;

const ForgotPassword = () => {
  const router = useRouter();

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");

  const handleResendEmail = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // await authService.sendPasswordResetEmail(email);
    } catch (error) {
      console.error("Error resending email:", error);
    } finally {
      setLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <Card className="rounded-2xl shadow-xl border-0">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircleOutlined className="text-2xl text-green-600" />
              </div>
              <Title level={2} className="mb-2">
                Check Your Email
              </Title>
              <Text type="secondary" className="text-base">
                We&apos;ve sent a password reset link to
              </Text>
              <Text strong className="block text-blue-600 mt-1">
                {email}
              </Text>
            </div>

            <Alert
              message="Email Sent Successfully"
              description="Please check your email and click the reset link to create a new password. The link will expire in 15 minutes."
              type="success"
              showIcon
              className="mb-6"
            />

            <div className="space-y-4">
              <Text type="secondary" className="block text-center text-sm">
                Didn&apos;t receive the email? Check your spam folder or
              </Text>

              <Button
                type="link"
                onClick={handleResendEmail}
                loading={loading}
                className="w-full"
              >
                Resend Email
              </Button>

              <Divider />

              <Button
                icon={<ArrowLeftOutlined />}
                onClick={() => router.push("/login")}
                className="w-full"
              >
                Back to Login
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Card className="rounded-2xl shadow-xl border-0">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MailOutlined className="text-2xl text-blue-600" />
            </div>
            <Title level={2} className="mb-2">
              Forgot Password?
            </Title>
            <Text type="secondary" className="text-base">
              No worries! Enter your email address and we&apos;ll send you a link to
              reset your password.
            </Text>
          </div>

          <Form
            form={form}
            // onFinish={handleSubmit}
            layout="vertical"
            requiredMark={false}
          >
            <Form.Item
              name="email"
              label="Email Address"
              rules={[
                { required: true, message: "Please enter your email address" },
                {
                  type: "email",
                  message: "Please enter a valid email address",
                },
              ]}
            >
              <Input
                prefix={<MailOutlined className="text-gray-400" />}
                placeholder="Enter your email address"
                                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item className="mb-6">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full h-12 text-base font-medium rounded-lg"
              >
                Send Reset Link
              </Button>
            </Form.Item>
          </Form>

          <div className="text-center space-y-4">
            <Text type="secondary" className="text-sm">
              Remember your password?
            </Text>

            <Button
              type="link"
              onClick={() => router.push("/login")}
              icon={<ArrowLeftOutlined />}
              className="p-0"
            >
              Back to Login
            </Button>
          </div>

          <Divider />

          <div className="text-center">
            <Text type="secondary" className="text-xs">
              Need help? Contact our{" "}
              <Link href="/support" className="text-blue-600" >
                support team
              </Link>
            </Text>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
