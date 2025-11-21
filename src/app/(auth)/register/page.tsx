"use client";

import React from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  Divider,
  message,
  Checkbox,
  Select,
  DatePicker,
  InputNumber,
  Row,
  Col,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  GoogleOutlined,
  FacebookOutlined,
  PhoneOutlined,
  IdcardOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { callResgister, RegisterRequest } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useMessage } from "@/components/share/MessageProvider";

interface RegisterFormValues {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  country: string;
  province: string;
  district: string;
  address: string;
  phone: string;
  birthday: Date;
  gender: "MALE" | "FEMALE" | "OTHER";
  identityNumber: string;
  bloodType: "A" | "B" | "AB" | "O";
  heightCm: number;
  weightKg: number;
  agreement: boolean;
}

const { Title, Text } = Typography;

const Register = () => {
  const { success, error } = useMessage();
  const router = useRouter();
  const [form] = Form.useForm();

  const handleSocialRegister = (provider: string) => {
    message.info(`${provider} registration will be implemented soon!`);
  };

  const handleRegister = async (values: RegisterFormValues) => {
    const payload: RegisterRequest = {
      user: {
        fullName: values.fullName,
        email: values.email,
        password: values.password,
      },
      patientProfile: {
        address: values.address,
        phone: values.phone,
        birthday: values.birthday
          ? (new Date(values.birthday).toISOString().split("T")[0] as string)
          : "",
        gender: values.gender,
        identityNumber: values.identityNumber,
        bloodType: values.bloodType,
        heightCm: values.heightCm,
        weightKg: values.weightKg,
      },
    };

    const response = await callResgister(payload);
    if (response && response.data) {
      router.push("/login");
      success("Registration successful!");
    } else {
      error("Register error " + response.error);
    }
  };

  return (
    <div className="!h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-6">
      <Card className="w-full max-w-4xl shadow-2xl border-0 rounded-xl">
        <div className="text-center mb-6">
          <Title level={2} className="mb-2">
            Create Account
          </Title>
          <Text type="secondary">
            Join SafeVax and start your vaccination journey
          </Text>
        </div>

        <Form
          form={form}
          name="register"
          onFinish={handleRegister}
          layout="vertical"
          requiredMark={false}
          className="space-y-4"
        >
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                name="fullName"
                label="Full Name"
                rules={[
                  { required: true, message: "Please input your full name!" },
                  { min: 2, message: "Name must be at least 2 characters!" },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Nguyen Van A" />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Please input your email!" },
                  { type: "email", message: "Please enter a valid email!" },
                ]}
              >
                <Input
                  prefix={<MailOutlined />}
                  placeholder="nguyenvana@example.com"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  { required: true, message: "Please input your password!" },
                  {
                    min: 8,
                    message: "Password must be at least 8 characters!",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Password"
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                name="confirmPassword"
                label="Confirm Password"
                dependencies={["password"]}
                rules={[
                  { required: true, message: "Please confirm your password!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Passwords do not match!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Confirm password"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                name="address"
                label="Address"
                rules={[
                  { required: true, message: "Please input your address!" },
                ]}
              >
                <Input
                  prefix={<HomeOutlined />}
                  placeholder="Số 10, đường Kim Mã"
                />
              </Form.Item>{" "}
            </Col>
            <Col xs={12} md={6}>
              <Form.Item
                name="heightCm"
                label="Height (cm)"
                rules={[
                  { required: true, message: "Please input your height!" },
                  {
                    type: "number",
                    min: 100,
                    max: 250,
                    message: "Please enter a valid height!",
                  },
                ]}
              >
                <InputNumber
                  placeholder="175"
                  className="!w-full"
                  min={100}
                  max={250}
                  step={0.1}
                />
              </Form.Item>
            </Col>

            <Col xs={12} md={6}>
              <Form.Item
                name="weightKg"
                label="Weight (kg)"
                rules={[
                  { required: true, message: "Please input your weight!" },
                  {
                    type: "number",
                    min: 30,
                    max: 200,
                    message: "Please enter a valid weight!",
                  },
                ]}
              >
                <InputNumber
                  placeholder="70.5"
                  className="!w-full"
                  min={30}
                  max={200}
                  step={0.1}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                  {
                    pattern: /^[0-9]{10,11}$/,
                    message: "Please enter a valid phone number!",
                  },
                ]}
              >
                <Input prefix={<PhoneOutlined />} placeholder="0912345678" />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                name="birthday"
                label="Date of Birth"
                rules={[
                  { required: true, message: "Please select your birthday!" },
                ]}
              >
                <DatePicker
                  placeholder="Select birthday"
                  className="w-full"
                  format="YYYY-MM-DD"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} md={8}>
              <Form.Item
                name="gender"
                label="Gender"
                rules={[
                  { required: true, message: "Please select your gender!" },
                ]}
              >
                <Select
                  placeholder="Select gender"
                  options={[
                    { value: "MALE", label: "Male" },
                    { value: "FEMALE", label: "Female" },
                    { value: "OTHER", label: "Other" },
                  ]}
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={8}>
              <Form.Item
                name="identityNumber"
                label="Identity Number"
                rules={[
                  {
                    required: true,
                    message: "Please input your identity number!",
                  },
                  {
                    pattern: /^[0-9]{9,12}$/,
                    message: "Please enter a valid identity number!",
                  },
                ]}
              >
                <Input prefix={<IdcardOutlined />} placeholder="012345678901" />
              </Form.Item>
            </Col>

            <Col xs={24} md={8}>
              <Form.Item
                name="bloodType"
                label="Blood Type"
                rules={[
                  { required: true, message: "Please select your blood type!" },
                ]}
              >
                <Select
                  placeholder="Select blood type"
                  options={[
                    { value: "A", label: "A" },
                    { value: "B", label: "B" },
                    { value: "AB", label: "AB" },
                    { value: "O", label: "O" },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error("Please accept the terms and conditions")
                      ),
              },
            ]}
            className="mb-4"
          >
            <Checkbox>
              I agree to the{" "}
              <Link href="/terms" className="text-blue-600 hover:text-blue-800">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="text-blue-600 hover:text-blue-800"
              >
                Privacy Policy
              </Link>
            </Checkbox>
          </Form.Item>

          <Form.Item className="mb-4">
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Create Account
            </Button>
          </Form.Item>
        </Form>

        <Divider>
          <Text type="secondary">Or sign up with</Text>
        </Divider>

        <div className="space-y-3 mb-6">
          <Button
            icon={<GoogleOutlined />}
            className="w-full h-10 rounded-lg font-medium"
            onClick={() => handleSocialRegister("Google")}
          >
            Sign up with Google
          </Button>

          <Button
            icon={<FacebookOutlined />}
            className="w-full h-10 rounded-lg font-medium"
            onClick={() => handleSocialRegister("Facebook")}
          >
            Sign up with Facebook
          </Button>
        </div>

        <div className="text-center">
          <Text type="secondary">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Sign in
            </Link>
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default Register;
