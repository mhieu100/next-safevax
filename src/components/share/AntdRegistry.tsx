'use client';
import '@/i18n';

import { App, ConfigProvider } from "antd";
import React from "react";
import { MessageProvider } from "./MessageProvider";

export function AntdProvider({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider>
      <App>
        <MessageProvider>{children}</MessageProvider>
      </App>
    </ConfigProvider>
  );
}
