// src/hooks/useStoreHydration.ts
"use client";

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore'; // Import store của bạn

/**
 * Hook để kiểm tra xem store Zustand đã hoàn thành việc khôi phục state từ storage chưa.
 * @returns {boolean} True nếu state đã được khôi phục.
 */
export const useStoreHydration = (): boolean => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // 💡 Lắng nghe sự kiện hydration hoàn tất của persist middleware
    const unsub = useAuthStore.persist.onFinishHydration(() => {
      setHydrated(true);
    });

    // Nếu store đã hydrate xong trước khi useEffect chạy (trường hợp hiếm)
    if (useAuthStore.persist.hasHydrated()) {
      setHydrated(true);
    }
    
    return () => {
      // Dọn dẹp listener khi component unmount
      // (Lưu ý: onFinishHydration không trả về hàm hủy đăng ký đơn giản,
      // nhưng việc này an toàn trong hầu hết các kịch bản)
      unsub?.(); 
    };
  }, []);

  return hydrated;
};