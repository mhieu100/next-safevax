"use client";

import React from "react";
import { Card, Typography, Button } from "antd";
import {
  UserOutlined,
  HistoryOutlined,
  ClockCircleOutlined,
  HeartOutlined,
  TeamOutlined,
  SettingOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

interface QuickActionsProps {
  onTabChange: (tabKey: string) => void;
  onOpenSettings: () => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onTabChange, onOpenSettings }) => {
  return (
    <Card className="!mb-6 rounded-xl shadow-sm border-0">
      <Title level={4} className="mb-4">
        Quick Actions
      </Title>
      <div className="space-y-3">
       
        <Button
          block
          className="text-left justify-start h-12 rounded-lg border-gray-200 hover:border-blue-400 hover:bg-blue-50"
          onClick={() => onTabChange("1")}
        >
          <UserOutlined className="mr-3 text-blue-500" />
          <span>Edit Health Profile</span>
        </Button>
        <Button
          block
          className="text-left justify-start h-12 rounded-lg border-gray-200 hover:border-purple-400 hover:bg-purple-50"
          onClick={() => onTabChange("2")}
        >
          <HistoryOutlined className="mr-3 text-purple-500" />
          <span>Vaccination History</span>
        </Button>
        <Button
          block
          className="text-left justify-start h-12 rounded-lg border-gray-200 hover:border-orange-400 hover:bg-orange-50"
          onClick={() => onTabChange("3")}
        >
          <ClockCircleOutlined className="mr-3 text-orange-500" />
          <span>Appointment Schedule</span>
        </Button>
        <Button
          block
          className="text-left justify-start h-12 rounded-lg border-gray-200 hover:border-red-400 hover:bg-red-50"
          onClick={() => onTabChange("4")}
        >
          <HeartOutlined className="mr-3 text-red-500" />
          <span>Health Reminders</span>
        </Button>
        <Button
          block
          className="text-left justify-start h-12 rounded-lg border-gray-200 hover:border-cyan-400 hover:bg-cyan-50"
          onClick={() => onTabChange("5")}
        >
          <TeamOutlined className="mr-3 text-cyan-500" />
          <span>Manage Family</span>
        </Button>
        <Button
          block
          className="text-left justify-start h-12 rounded-lg border-gray-200 hover:border-purple-400 hover:bg-purple-50"
          onClick={() => onTabChange("6")}
        >
          <SafetyCertificateOutlined className="mr-3 text-purple-500" />
          <span>Vaccine Passport</span>
        </Button>
        <Button
          block
          className="text-left justify-start h-12 rounded-lg border-gray-200 hover:border-gray-400 hover:bg-gray-50"
          onClick={onOpenSettings}
        >
          <SettingOutlined className="mr-3 text-gray-500" />
          <span>Account Settings</span>
        </Button>
      </div>
    </Card>
  );
};

export default QuickActions;