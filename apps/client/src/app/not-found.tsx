"use client";

import { Result, Button, Typography } from "antd";
import { HomeOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { Title, Paragraph } = Typography;

export default function NotFound() {
  const router = useRouter();

  const handleGoHome = () => {
    router.push("/");
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleShowVaccine = () => {
    router.push("/vaccine");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 p-6">
      <Result
        icon={
          <div className="text-6xl md:text-8xl lg:text-9xl font-black text-blue-600 leading-none mb-4 drop-shadow-lg">
            404
          </div>
        }
        title={
          <Title level={2} className="text-gray-800 font-bold m-0">
            Oops! Page Not Found
          </Title>
        }
        subTitle={
          <div className="mb-8">
            <Paragraph className="text-base text-gray-600 m-0">
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </Paragraph>
            <Paragraph className="text-sm text-gray-500 mt-2">
              Don&apos;t worry, it happens to the best of us. Let&apos;s get you back
              on track!
            </Paragraph>
          </div>
        }
        extra={
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              type="primary"
              icon={<HomeOutlined />}
              onClick={handleGoHome}
              className="bg-blue-600 hover:bg-blue-700 border-blue-600 w-full sm:w-auto"
            >
              Go Home
            </Button>
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={handleGoBack}
              className="hover:border-blue-600 hover:text-blue-600 w-full sm:w-auto"
            >
              Go Back
            </Button>
            <Button
              type="default"
              onClick={handleShowVaccine}
              className="hover:border-blue-600 hover:text-blue-600 w-full sm:w-auto"
            >
              View Vaccine Now
            </Button>
          </div>
        }
        className="bg-white rounded-2xl shadow-2xl p-12 max-w-2xl w-full"
      />
    </div>
  );
};
