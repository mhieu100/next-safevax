'use client';

import React from 'react';
import { Card, Row, Col, Statistic, Badge, Table, Tag, Spin, Alert } from 'antd';
import {
  BlockOutlined,
  DashboardOutlined,
  ClockCircleOutlined,
  LinkOutlined,
  WifiOutlined,
} from '@ant-design/icons';
import { useBlockchainStats } from '@/hooks/useBlockchainStats';
import { NewBlock } from '@/services/socket.service';

const BlockchainStatsComponent: React.FC = () => {
  const { stats, latestBlock, recentBlocks, isConnected, isLoading } = useBlockchainStats();

  // Format time
  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('vi-VN');
  };

  // Format hash (shorten)
  const formatHash = (hash: string) => {
    if (!hash) return '-';
    return `${hash.substring(0, 10)}...${hash.substring(hash.length - 8)}`;
  };

  // Recent blocks table columns
  const columns = [
    {
      title: 'Block #',
      dataIndex: 'blockNumber',
      key: 'blockNumber',
      render: (num: number) => <Tag color="blue">#{num}</Tag>,
    },
    {
      title: 'Hash',
      dataIndex: 'hash',
      key: 'hash',
      render: (hash: string) => (
        <span className="font-mono text-xs">{formatHash(hash)}</span>
      ),
    },
    {
      title: 'Transactions',
      dataIndex: 'transactions',
      key: 'transactions',
      render: (count: number) => <Badge count={count} showZero color="green" />,
    },
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (timestamp: number) => formatTime(timestamp),
    },
    {
      title: 'Difficulty',
      dataIndex: 'difficulty',
      key: 'difficulty',
      render: (diff?: number) => diff || '-',
    },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Spin size="large" tip="Đang kết nối đến blockchain..." />
      </div>
    );
  }

  if (!isConnected) {
    return (
      <Alert
        message="Mất kết nối"
        description="Không thể kết nối đến blockchain server. Vui lòng kiểm tra lại."
        type="error"
        showIcon
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <Card size="small">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Trạng thái kết nối:</span>
          <Badge
            status={isConnected ? 'success' : 'error'}
            text={isConnected ? 'Đã kết nối' : 'Mất kết nối'}
          />
        </div>
      </Card>

      {/* Blockchain Statistics */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Tổng số Block"
              value={stats?.totalBlocks || 0}
              prefix={<BlockOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Tổng Transactions"
              value={stats?.totalTransactions || 0}
              prefix={<DashboardOutlined />}
              valueStyle={{ color: '#1677ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Thời gian Block TB"
              value={stats?.averageBlockTime || 0}
              suffix="s"
              prefix={<ClockCircleOutlined />}
              precision={2}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Network Hash Rate"
              value={stats?.networkHashRate || 'N/A'}
              prefix={<WifiOutlined />}
              valueStyle={{ fontSize: '20px' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Latest Block Info */}
      {latestBlock && (
        <Card
          title={
            <div className="flex items-center gap-2">
              <LinkOutlined />
              <span>Block Mới Nhất</span>
              <Tag color="success">#{latestBlock.blockNumber}</Tag>
            </div>
          }
        >
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Hash:</span>
                  <span className="font-mono text-xs">{formatHash(latestBlock.hash)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Previous Hash:</span>
                  <span className="font-mono text-xs">{formatHash(latestBlock.previousHash)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Transactions:</span>
                  <Badge count={latestBlock.transactions} showZero color="green" />
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Timestamp:</span>
                  <span>{formatTime(latestBlock.timestamp)}</span>
                </div>
                {latestBlock.miner && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Miner:</span>
                    <span className="font-mono text-xs">{formatHash(latestBlock.miner)}</span>
                  </div>
                )}
                {latestBlock.nonce !== undefined && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Nonce:</span>
                    <span>{latestBlock.nonce}</span>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Card>
      )}

      {/* Recent Blocks Table */}
      <Card title="Các Block Gần Đây">
        <Table
          columns={columns}
          dataSource={recentBlocks}
          rowKey="blockNumber"
          pagination={false}
          scroll={{ x: 'max-content' }}
        />
      </Card>
    </div>
  );
};

export default BlockchainStatsComponent;
