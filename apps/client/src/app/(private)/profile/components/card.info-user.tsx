import {
  CalendarOutlined,
  CameraOutlined,
  EditOutlined,
  GiftOutlined,
  HeartOutlined,
  MailOutlined,
  SettingOutlined,
  ShoppingOutlined,
  TrophyOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Button, Card, Statistic, Typography } from "antd";
import React from "react";

const { Title, Text } = Typography;

interface InfoUserProps {
  setOpen: (open: boolean) => void;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  setActiveTab: (tab: string) => void;
  onOpenSettings: () => void;
}

const CardInfoUser = ({
  setOpen,
  editMode,
  setEditMode,
  onOpenSettings,
}: InfoUserProps) => {
  return (
    <Card className="!mb-8 rounded-2xl shadow-lg border-0 overflow-hidden">
      <div className="!bg-gradient-to-r !from-blue-600 !to-purple-600 h-32 relative"></div>

      <div className="px-6 pb-6 -mt-16 relative">
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6">
          <div className="relative">
            <Avatar
              size={120}
              //   src={userInfo?.avatar}
              src="https://imgs.search.brave.com/CQwtZ5K2gC4p1MfW-jfewi9v1tMrgTcV0ecpWUcZ8do/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvY3V0/ZS1hbmltZS1wcm9m/aWxlLXBpY3R1cmVz/LXZtcmNoOTliZ281/bWptNHYuanBn"
              icon={<UserOutlined />}
              className="border-4 border-white shadow-xl !bg-gradient-to-br !from-blue-400 !to-purple-500"
            />
            <Button
              icon={<CameraOutlined />}
              shape="circle"
              size="small"
              onClick={() => setOpen(true)}
              className="absolute bottom-2 right-2 bg-white text-gray-600 border-2 border-white shadow-lg hover:bg-blue-50"
            />
            <Badge
              status="success"
              className="absolute top-2 right-2"
              title="Online"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Title level={2} className="mb-0 text-gray-800">
                    {"John Doe"}
                  </Title>
                  <Badge count="VIP" style={{ backgroundColor: "#f59e0b" }} />
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <MailOutlined className="text-gray-400" />
                  <Text className="text-gray-600">
                    {"john.doe@example.com"}
                  </Text>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <CalendarOutlined />
                    Member since Jan 2024
                  </span>
                  <span className="flex items-center gap-1">
                    <TrophyOutlined />
                    Gold Member
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  icon={<EditOutlined />}
                  onClick={() => setEditMode(!editMode)}
                  type={editMode ? "primary" : "default"}
                  className="rounded-lg"
                >
                  {editMode ? "Cancel" : "Edit Profile"}
                </Button>
                <Button
                  icon={<SettingOutlined />}
                  className="rounded-lg"
                  onClick={onOpenSettings}
                >
                  Settings
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-100">
          <div className="text-center">
            <Statistic
              title="Total Orders"
              value={12}
              prefix={<ShoppingOutlined className="text-blue-500" />}
              valueStyle={{ color: "#1890ff", fontSize: "20px" }}
            />
          </div>
          <div className="text-center">
            <Statistic
              title="Wishlist Items"
              value={8}
              prefix={<HeartOutlined className="text-red-500" />}
              valueStyle={{ color: "#f5222d", fontSize: "20px" }}
            />
          </div>
          <div className="text-center">
            <Statistic
              title="Reward Points"
              value={2450}
              prefix={<GiftOutlined className="text-orange-500" />}
              valueStyle={{ color: "#fa8c16", fontSize: "20px" }}
            />
          </div>
          <div className="text-center">
            <Statistic
              title="Total Saved"
              value={189}
              prefix="$"
              suffix="USD"
              valueStyle={{ color: "#52c41a", fontSize: "20px" }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CardInfoUser;
