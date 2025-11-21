// src/hooks/useStoreHydration.ts
"use client";

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore'; // Import store của bạn

/**
 * Hook để kiểm tra xem store Zustand đã hoàn thành việc khôi phục state từ storage chưa.
 * @returns {boolean} True nếu state đã được khôi phục.
 */
export const useStoreHydration = (): boolean => {
  // Bắt đầu với false để tránh lỗi SSR
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Chỉ chạy trên client
    const store = useAuthStore.persist;
    
    if (!store) {
      // Nếu không có persist middleware, coi như đã hydrate
      setHydrated(true);
      return;
    }

    // Kiểm tra xem đã hydrate chưa
    if (store.hasHydrated()) {
      setHydrated(true);
      return;
    }

    // 💡 Lắng nghe sự kiện hydration hoàn tất của persist middleware
    const unsub = store.onFinishHydration(() => {
      setHydrated(true);
    });
    
    return () => {
      unsub?.(); 
    };
  }, []);

  return hydrated;
};