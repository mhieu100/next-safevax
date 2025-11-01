// src/hooks/useStoreHydration.ts
"use client";

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore'; // Import store của bạn

/**
 * Hook để kiểm tra xem store Zustand đã hoàn thành việc khôi phục state từ storage chưa.
 * @returns {boolean} True nếu state đã được khôi phục.
 */
export const useStoreHydration = (): boolean => {
  // Kiểm tra ngay lập tức xem đã hydrate chưa để tránh flash
  const [hydrated, setHydrated] = useState(() => 
    useAuthStore.persist.hasHydrated()
  );

  useEffect(() => {
    // Nếu đã hydrate rồi thì không cần subscribe nữa
    if (hydrated) return;

    // 💡 Lắng nghe sự kiện hydration hoàn tất của persist middleware
    const unsub = useAuthStore.persist.onFinishHydration(() => {
      setHydrated(true);
    });

    // Double check trong useEffect
    if (useAuthStore.persist.hasHydrated()) {
      setHydrated(true);
    }
    
    return () => {
      unsub?.(); 
    };
  }, [hydrated]);

  return hydrated;
};