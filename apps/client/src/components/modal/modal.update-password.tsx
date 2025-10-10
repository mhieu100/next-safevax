import { CheckCircleOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Typography } from "antd";
import React from "react";

const { Text } = Typography;

interface UpdatePassWordProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ModalUpdatePassWord = ({ open, setOpen }: UpdatePassWordProps) => {
  const [securityForm] = Form.useForm();

  return (
    <Modal
      title="Security Settings"
      open={open}
      onCancel={() => setOpen(false)}
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

          <Form form={securityForm} layout="vertical">
            <Form.Item label="Current Password" name="currentPassword">
              <Input.Password
                                placeholder="Enter current password"
              />
            </Form.Item>

            <Form.Item label="New Password" name="newPassword">
              <Input.Password  placeholder="Enter new password" />
            </Form.Item>

            <Form.Item label="Confirm New Password" name="confirmPassword">
              <Input.Password  placeholder="Confirm new password" />
            </Form.Item>

            <div className="flex gap-3">
              <Button type="primary" >
                Update Password
              </Button>
              <Button  onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default ModalUpdatePassWord;
