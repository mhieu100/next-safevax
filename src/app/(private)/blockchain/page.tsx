'use client';

import React from 'react';
import BlockchainStatsComponent from '@/components/blockchain/BlockchainStats';
import { SocketProvider } from '@/contexts/SocketContext';

export default function BlockchainPage() {
  return (
    <SocketProvider>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Blockchain Real-time Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Theo dõi trạng thái blockchain theo thời gian thực
          </p>
        </div>
        <BlockchainStatsComponent />
      </div>
    </SocketProvider>
  );
}
