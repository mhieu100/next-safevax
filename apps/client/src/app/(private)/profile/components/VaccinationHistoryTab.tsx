"use client";

import React from "react";
import { Typography, Table, Tag } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export interface VaccinationRecord {
  key: string;
  vaccine: string;
  date: string;
  status: string;
  nextDose: string;
  batch: string;
  location: string;
}

interface VaccinationHistoryTabProps {
  vaccinationHistory: VaccinationRecord[];
}

const VaccinationHistoryTab: React.FC<VaccinationHistoryTabProps> = ({
  vaccinationHistory,
}) => {
  const columns = [
    {
      title: "Vaccine",
      dataIndex: "vaccine",
      key: "vaccine",
      render: (text: string) => (
        <div>
          <Text strong>{text}</Text>
        </div>
      ),
    },
    {
      title: "Date Received",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color="green">
          <CheckCircleOutlined /> {status}
        </Tag>
      ),
    },
    {
      title: "Next Due",
      dataIndex: "nextDose",
      key: "nextDose",
      render: (date: string) => (
        <Text type={new Date(date) < new Date() ? "danger" : "secondary"}>
          {date}
        </Text>
      ),
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
  ];

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <Title level={4}>Vaccination History</Title>
      </div>
      <Table
        dataSource={vaccinationHistory}
        columns={columns}
        pagination={false}
      />
    </div>
  );
};

export default VaccinationHistoryTab;
