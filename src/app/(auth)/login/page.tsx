"use client";

import React from "react";
import { Button, Card, Typography, Divider, message } from "antd";
import { GoogleOutlined, FacebookOutlined } from "@ant-design/icons";
import Link from "next/link";
import FormLogin from "@/components/form/form.login";

const { Title, Text } = Typography;

const Login = () => {

  const handleSocialLogin = (provider: string) => {
    message.info(`${provider} login will be implemented soon!`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-6">
      <Card className="w-full max-w-md shadow-2xl border-0 rounded-xl">
        <div className="text-center mb-6">
          <Title level={2} className="mb-2">
            Welcome Back
          </Title>
          <Text type="secondary">Sign in to your account to continue</Text>
        </div>

        <FormLogin />

        <Divider>
          <Text type="secondary">Or continue with</Text>
        </Divider>

        <div className="space-y-3 mb-6">
          <Button
            icon={<GoogleOutlined />}
                        className="w-full h-10 rounded-lg font-medium"
            onClick={() => handleSocialLogin("Google")}
          >
            Continue with Google
          </Button>

          <Button
            icon={<FacebookOutlined />}
                        className="w-full h-10 rounded-lg font-medium"
            onClick={() => handleSocialLogin("Facebook")}
          >
            Continue with Facebook
          </Button>
        </div>

        <div className="text-center">
          <Text type="secondary">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Sign up
            </Link>
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default Login;
