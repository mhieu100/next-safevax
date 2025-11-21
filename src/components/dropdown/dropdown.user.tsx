'use client';

import { callLogout } from "@/services/auth.service";
import { useAuthStore } from "@/store/authStore";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import { useMessage } from "../share/MessageProvider";
import { useTranslation } from "react-i18next";

const DropdownUser = () => {
  const router = useRouter();
  const { success } = useMessage();
  const { logout } = useAuthStore();
  const { t } = useTranslation("common"); 

  const handleLogout = async () => {
    const response = await callLogout();
    if (response && response.statusCode === 200) {
      logout();
      success(t("user.logoutSuccess")); 
    }
  };

  const userItems = [
    {
      key: "profile",
      label: t("user.profile"), 
      icon: <UserOutlined />,
      onClick: () => router.push("/profile"),
    },
    {
      key: "logout",
      label: t("user.logout"), 
      icon: <LogoutOutlined />,
      onClick: handleLogout,
      danger: true,
    },
  ];

  return (
    <Dropdown
      menu={{ items: userItems }}
      placement="bottomRight"
      className="hidden md:block"
    >
      <Avatar
        src={
          "https://imgs.search.brave.com/kRzOEK2P26KHgRlY94E5DGE517Q4IJTULPg_lFWXLSU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHlw/aXguY29tL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDIxLzEwL2Fu/aW1lLWF2YXRhci1w/cm9maWxlLXBpY3R1/cmUtdGh5cGl4LTI0/LTcwMHg3MDAuanBn"
        }
        icon={<UserOutlined />}
        className="cursor-pointer"
        size="default"
      />
    </Dropdown>
  );
};

export default DropdownUser;
