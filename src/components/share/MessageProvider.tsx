"use client";

import { message } from "antd";
import React, { createContext, useContext } from "react";

type MessageType = "success" | "error" | "warning" | "info" | "loading";

interface MessageContextProps {
  success: (content: string) => void;
  error: (content: string) => void;
  warning: (content: string) => void;
  info: (content: string) => void;
  loading: (content: string) => void;
}

const MessageContext = createContext<MessageContextProps | null>(null);

export const MessageProvider = ({ children }: { children: React.ReactNode }) => {
  const [messageApi, contextHolder] = message.useMessage();

  const openMessage = (type: MessageType, content: string) => {
    messageApi.open({ type, content });
  };

  return (
    <MessageContext.Provider
      value={{
        success: (content: string) => openMessage("success", content),
        error: (content: string) => openMessage("error", content),
        warning: (content: string) => openMessage("warning", content),
        info: (content: string) => openMessage("info", content),
        loading: (content: string) => openMessage("loading", content),
      }}
    >
      {contextHolder}
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = () => {
  const ctx = useContext(MessageContext);
  if (!ctx) {
    throw new Error("useMessage must be used within a MessageProvider");
  }
  return ctx;
};
