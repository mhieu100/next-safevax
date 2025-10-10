"use client";

import React from "react";
import { Typography, Button, Card, Tag, Timeline } from "antd";
import { CheckCircleOutlined, ClockCircleOutlined, PlusOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export interface AppointmentRecord {
  key: string;
  vaccine: string;
  date: string;
  time: string;
  location: string;
  status: string;
}

interface AppointmentScheduleTabProps {
  upcomingAppointments: AppointmentRecord[];
  onNewBooking: () => void;
}

const AppointmentScheduleTab: React.FC<AppointmentScheduleTabProps> = ({
  upcomingAppointments,
  onNewBooking
}) => {
  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <Title level={4}>Upcoming Appointments</Title>
        <Button type="primary" onClick={onNewBooking}>
          <PlusOutlined /> Schedule New
        </Button>
      </div>
      
      <Timeline
        items={upcomingAppointments.map((apt) => ({
          dot: apt.status === "Confirmed" ? 
            <CheckCircleOutlined className="text-green-500" /> : 
            <ClockCircleOutlined className="text-orange-500" />,
          children: (
            <Card size="small" className="mb-2">
              <div className="flex justify-between items-start">
                <div>
                  <Title level={5} className="mb-1">{apt.vaccine}</Title>
                  <Text type="secondary">
                    📅 {apt.date} at {apt.time}
                  </Text>
                  <br />
                  <Text type="secondary">
                    📍 {apt.location}
                  </Text>
                </div>
                <Tag color={apt.status === "Confirmed" ? "green" : "orange"}>
                  {apt.status}
                </Tag>
              </div>
            </Card>
          ),
        }))}
      />

      <Card className="mt-4 bg-blue-50">
        <Title level={5}>📋 Appointment Guidelines</Title>
        <ul className="text-sm text-gray-600 mt-2 space-y-1">
          <li>• Please arrive 15 minutes before your appointment</li>
          <li>• Bring your ID and insurance card</li>
          <li>• Wear comfortable clothing</li>
          <li>• Inform us of any allergies or medications</li>
        </ul>
      </Card>
    </div>
  );
};

export default AppointmentScheduleTab;