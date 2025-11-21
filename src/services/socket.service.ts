import { io, Socket } from 'socket.io-client';

// Types
export interface BlockchainStats {
  totalBlocks: number;
  totalTransactions: number;
  averageBlockTime: number;
  lastBlockHash: string;
  lastBlockTimestamp: number;
  networkHashRate?: string;
  difficulty?: number;
}

export interface NewBlock {
  blockNumber: number;
  hash: string;
  previousHash: string;
  timestamp: number;
  transactions: number;
  miner?: string;
  nonce?: number;
  difficulty?: number;
}

class SocketService {
  private socket: Socket | null = null;
  private readonly url: string;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  constructor(url = 'http://localhost:4000') {
    this.url = url;
  }

  connect(): Socket {
    if (this.socket?.connected) {
      return this.socket;
    }

    this.socket = io(this.url, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: this.maxReconnectAttempts,
    });

    this.setupListeners();
    return this.socket;
  }

  private setupListeners() {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('✅ Socket.IO Connected!');
      this.reconnectAttempts = 0;
    });

    this.socket.on('disconnect', (reason) => {
      console.log('❌ Socket.IO Disconnected:', reason);
    });

    this.socket.on('connect_error', (error) => {
      console.error('❌ Connection Error:', error.message);
      this.reconnectAttempts++;
    });

    this.socket.on('error', (error) => {
      console.error('❌ Socket Error:', error);
    });
  }

  onBlockchainStats(callback: (stats: BlockchainStats) => void) {
    if (!this.socket) return;
    this.socket.on('blockchainStats', callback);
  }

  onNewBlock(callback: (block: NewBlock) => void) {
    if (!this.socket) return;
    this.socket.on('newBlock', callback);
  }

  offBlockchainStats(callback?: (stats: BlockchainStats) => void) {
    if (!this.socket) return;
    if (callback) {
      this.socket.off('blockchainStats', callback);
    } else {
      this.socket.off('blockchainStats');
    }
  }

  offNewBlock(callback?: (block: NewBlock) => void) {
    if (!this.socket) return;
    if (callback) {
      this.socket.off('newBlock', callback);
    } else {
      this.socket.off('newBlock');
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  isConnected(): boolean {
    return this.socket?.connected || false;
  }

  getSocket(): Socket | null {
    return this.socket;
  }
}

// Export singleton instance
export const socketService = new SocketService(
  process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:4000'
);

export default socketService;
