import { Button, Table, Tag, Typography } from "antd";
import React from "react";

const { Title } = Typography;

// Mock order data
const orders = [
  {
    key: "1",
    orderId: "#ORD-001",
    date: "2024-01-15",
    status: "Delivered",
    total: "$299.99",
    items: 3,
  },
  {
    key: "2",
    orderId: "#ORD-002",
    date: "2024-01-10",
    status: "Shipped",
    total: "$149.50",
    items: 2,
  },
  {
    key: "3",
    orderId: "#ORD-003",
    date: "2024-01-05",
    status: "Processing",
    total: "$89.99",
    items: 1,
  },
];

const orderColumns = [
  {
    title: "Order ID",
    dataIndex: "orderId",
    key: "orderId",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: string) => {
      let color = "blue";
      if (status === "Delivered") color = "green";
      if (status === "Shipped") color = "orange";
      if (status === "Processing") color = "blue";
      return <Tag color={color}>{status}</Tag>;
    },
  },
  {
    title: "Items",
    dataIndex: "items",
    key: "items",
  },
  {
    title: "Total",
    dataIndex: "total",
    key: "total",
  },
  {
    title: "Action",
    key: "action",
    render: () => (
      <Button type="link" size="small">
        View Details
      </Button>
    ),
  },
];

const TabHistoryOrder = () => {
  return (
    <div className="py-4">
      <div className="flex justify-between items-center mb-6">
        <Title level={4}>Recent Orders</Title>
        <Button type="primary">View All Orders</Button>
      </div>
      <Table
        columns={orderColumns}
        dataSource={orders}
        pagination={false}
        className="rounded-lg"
      />
    </div>
  );
};

export default TabHistoryOrder;
