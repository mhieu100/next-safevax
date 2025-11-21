'use client';

import { useEffect, useState } from 'react';
import { useSocket } from '@/contexts/SocketContext';
import socketService, { BlockchainStats, NewBlock } from '@/services/socket.service';

interface UseBlockchainStatsReturn {
  stats: BlockchainStats | null;
  latestBlock: NewBlock | null;
  recentBlocks: NewBlock[];
  isConnected: boolean;
  isLoading: boolean;
}

export const useBlockchainStats = (): UseBlockchainStatsReturn => {
  const { isConnected } = useSocket();
  const [stats, setStats] = useState<BlockchainStats | null>(null);
  const [latestBlock, setLatestBlock] = useState<NewBlock | null>(null);
  const [recentBlocks, setRecentBlocks] = useState<NewBlock[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isConnected) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    // Listen for blockchain stats
    const handleBlockchainStats = (newStats: BlockchainStats) => {
      setStats(newStats);
      setIsLoading(false);
    };

    // Listen for new blocks
    const handleNewBlock = (block: NewBlock) => {
      setLatestBlock(block);
      setRecentBlocks((prev) => {
        const updated = [block, ...prev];
        // Keep only last 10 blocks
        return updated.slice(0, 10);
      });
    };

    socketService.onBlockchainStats(handleBlockchainStats);
    socketService.onNewBlock(handleNewBlock);

    // Cleanup
    return () => {
      socketService.offBlockchainStats(handleBlockchainStats);
      socketService.offNewBlock(handleNewBlock);
    };
  }, [isConnected]);

  return {
    stats,
    latestBlock,
    recentBlocks,
    isConnected,
    isLoading,
  };
};
