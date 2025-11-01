"use client";

import React from "react";
import { Card, Typography, Badge, Progress, Statistic } from "antd";
import { SafetyCertificateOutlined, MedicineBoxOutlined, CalendarOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

interface HealthStatusCardProps {
  totalVaccines: number;
  upcomingAppointments: number;
  coveragePercentage: number;
  nextAppointment?: string;
}

const HealthStatusCard: React.FC<HealthStatusCardProps> = ({
  totalVaccines,
  upcomingAppointments,
  coveragePercentage,
  nextAppointment
}) => {
  return (
    <>
      {/* Health Status Card */}
      <Card className="!mb-6 rounded-xl shadow-sm border-0">
        <div className="text-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <SafetyCertificateOutlined className="text-2xl text-white" />
          </div>
          <Title level={4} className="mb-1">
            Health Status
          </Title>
          <Badge status="success" text="All Vaccinations Up to Date" />
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Text className="text-sm">Vaccination Coverage</Text>
            <Text strong className="text-green-600">{coveragePercentage}%</Text>
          </div>
          <Progress
            percent={coveragePercentage}
            strokeColor={{
              "0%": "#10b981",
              "100%": "#059669",
            }}
            className="mb-4"
          />
        </div>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-lg">
          <Text className="text-sm text-green-800">
            💉 {nextAppointment ? `Next appointment: ${nextAppointment}` : "No upcoming appointments"}
          </Text>
        </div>
      </Card>

      {/* Health Statistics */}
      <Card className="!mb-6 rounded-xl shadow-sm border-0">
        <Title level={4} className="mb-4">
          Health Overview
        </Title>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <Statistic
              title="Total Vaccines"
              value={totalVaccines}
              prefix={<MedicineBoxOutlined className="text-blue-500" />}
              valueStyle={{ color: "#2563eb", fontSize: "1.5rem" }}
            />
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <Statistic
              title="Upcoming"
              value={upcomingAppointments}
              prefix={<CalendarOutlined className="text-green-500" />}
              valueStyle={{ color: "#059669", fontSize: "1.5rem" }}
            />
          </div>
        </div>
      </Card>
    </>
  );
};

export default HealthStatusCard;