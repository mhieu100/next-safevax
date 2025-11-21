import { BellOutlined, LockOutlined, SafetyOutlined } from "@ant-design/icons";
import { Button, Card, Select, Switch, Typography } from "antd";
import React from "react";

const { Title, Text } = Typography;

interface SettingUserProps {
  setOpen: (open: boolean) => void;
}
const TabSettingUser = ({ setOpen }: SettingUserProps) => {
  return (
    <div className="py-6">
      <Title level={4} className="mb-6">
        Account Settings
      </Title>

      <div className="space-y-6">
        {/* Notification Settings */}
        <Card className="rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <BellOutlined className="text-blue-500 text-lg" />
              <div>
                <Text strong>Email Notifications</Text>
                <Text type="secondary" className="block text-sm">
                  Receive updates about your orders and account
                </Text>
              </div>
            </div>
            <Switch defaultChecked />
          </div>
        </Card>

        {/* Security Settings */}
        <Card className="rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <LockOutlined className="text-green-500 text-lg" />
              <div>
                <Text strong>Two-Factor Authentication</Text>
                <Text type="secondary" className="block text-sm">
                  Add an extra layer of security to your account
                </Text>
              </div>
            </div>
            <Button type="primary" onClick={() => setOpen(true)}>
              Configure
            </Button>
          </div>
        </Card>

        {/* Privacy Settings */}
        <Card className="rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <SafetyOutlined className="text-purple-500 text-lg" />
              <div>
                <Text strong>Profile Visibility</Text>
                <Text type="secondary" className="block text-sm">
                  Control who can see your profile information
                </Text>
              </div>
            </div>
            <Select defaultValue="friends" style={{ width: 120 }}>
              <Select.Option value="public">Public</Select.Option>
              <Select.Option value="friends">Friends</Select.Option>
              <Select.Option value="private">Private</Select.Option>
            </Select>
          </div>
        </Card>

        {/* Danger Zone */}
        <Card className="rounded-lg border border-red-200 bg-red-50">
          <Title level={5} className="text-red-600 mb-4">
            Danger Zone
          </Title>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Text strong>Delete Account</Text>
                <Text type="secondary" className="block text-sm">
                  Permanently delete your account and all data
                </Text>
              </div>
              <Button danger>Delete Account</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Text strong>Sign Out All Devices</Text>
                <Text type="secondary" className="block text-sm">
                  Sign out from all devices except this one
                </Text>
              </div>
              {/* <Button danger onClick={handleLogout}>
                                  Sign Out All
                                </Button> */}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TabSettingUser;
