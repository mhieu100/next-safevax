"use client";

import { LoginFormData, loginSchema } from "@/schemas/authSchema";
import { callLogin } from "@/services/auth.service";
import { useAuthStore } from "@/store/authStore";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { useMessage } from "../share/MessageProvider";

const FormLogin = () => {
  const router = useRouter();

  const { setAuth } = useAuthStore();
  const { success, error } = useMessage();
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    criteriaMode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await callLogin(data.email, data.password);
      if (response && response.data) {
        setAuth(response.data.user, response.data.accessToken);
        success("Login successful!");
        router.push("/");
      } else {
        error(response.error as string);
      }
    } catch (err) {
      error(err instanceof Error ? err.message : "An unknown error occurred");
    }
  };

  return (
    <Form
      name="login"
      onFinish={handleSubmit(onSubmit)}
      layout="vertical"
      requiredMark={false}
      className="space-y-4"
    >
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <Form.Item
            label="Email"
            validateStatus={errors.email ? "error" : ""}
            help={errors.email?.message}
            required
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input
              {...field}
              placeholder="Nhập địa chỉ email"
                            prefix={<UserOutlined className="site-form-item-icon" />}
            />
          </Form.Item>
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <Form.Item
            label="Password"
            validateStatus={errors.password ? "error" : ""}
            help={errors.password?.message}
            required
          >
            <Input.Password
              {...field}
              placeholder="Nhập mật khẩu"
                            prefix={<LockOutlined className="site-form-item-icon" />}
            />
          </Form.Item>
        )}
      />
      <Form.Item className="mb-4">
        <div className="flex justify-end">
          <Button
            type="link"
            onClick={() => router.push("/forgot-password")}
            className="p-0 text-blue-600 hover:text-blue-800"
          >
            Forgot password?
          </Button>
        </div>
      </Form.Item>

      <Form.Item className="mb-4">
        <Button
          type="primary"
          htmlType="submit"
          loading={isSubmitting}
          disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700"
        >
          {isSubmitting ? "Loading..." : "Sign In"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormLogin;
