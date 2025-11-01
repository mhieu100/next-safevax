import { CheckCircleOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Typography } from "antd";
import React, { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { callChangePassword } from "@/services/auth.service";
import { useMessage } from "../share/MessageProvider";

const { Text } = Typography;

interface UpdatePassWordProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ModalUpdatePassWord = ({ open, setOpen }: UpdatePassWordProps) => {
  const { success, error } = useMessage();
  const [securityForm] = Form.useForm<PasswordFormData>();
  const [loading, setLoading] = useState(false);
  const { user } = useAuthStore();

  const handleUpdatePassword = async (values: PasswordFormData) => {
    if (!user?.email) {
      error("User email not found");
      return;
    }

    if (values.newPassword !== values.confirmPassword) {
      error("New password and confirm password do not match");
      return;
    }

    setLoading(true);
    try {
      const response = await callChangePassword({
        email: user.email,
        oldPassword: values.currentPassword,
        newPassword: values.newPassword,
      });

      // Response structure: { statusCode: 200, message: "Update password", data: true/false }
      if (response && typeof response === "object" && "data" in response) {
        if (response.data === true) {
          success(response.message || "Password updated successfully");
          securityForm.resetFields();
          setOpen(false);
        } else {
          error(
            "Failed to update password. Please check your current password."
          );
        }
      } else {
        error("Unexpected response format");
      }
    } catch (error) {
      const errorMessage =
        (error as Error)?.message ||
        "An error occurred while updating password";
      console.error("Change password error:", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    securityForm.resetFields();
    setOpen(false);
  };

  return (
    <Modal
      title="Security Settings"
      open={open}
      onCancel={handleCancel}
      footer={null}
      width={600}
    >
      <div className="py-4">
        <div className="space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <CheckCircleOutlined className="text-green-600 text-lg" />
              <div>
                <Text strong className="text-green-800">
                  Account Secure
                </Text>
                <Text className="block text-sm text-green-600">
                  Your account has strong security settings enabled
                </Text>
              </div>
            </div>
          </div>

          <Form
            form={securityForm}
            layout="vertical"
            onFinish={handleUpdatePassword}
          >
            <Form.Item
              label="Current Password"
              name="currentPassword"
              rules={[
                { required: true, message: "Please enter current password" },
                { min: 6, message: "Password must be at least 6 characters" },
              ]}
            >
              <Input.Password placeholder="Enter current password" />
            </Form.Item>

            <Form.Item
              label="New Password"
              name="newPassword"
              rules={[
                { required: true, message: "Please enter new password" },
                { min: 6, message: "Password must be at least 6 characters" },
              ]}
            >
              <Input.Password placeholder="Enter new password" />
            </Form.Item>

            <Form.Item
              label="Confirm New Password"
              name="confirmPassword"
              rules={[
                { required: true, message: "Please confirm new password" },
                { min: 6, message: "Password must be at least 6 characters" },
              ]}
            >
              <Input.Password placeholder="Confirm new password" />
            </Form.Item>

            <div className="flex gap-3">
              <Button type="primary" htmlType="submit" loading={loading}>
                Update Password
              </Button>
              <Button onClick={handleCancel}>Cancel</Button>
            </div>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default ModalUpdatePassWord;
