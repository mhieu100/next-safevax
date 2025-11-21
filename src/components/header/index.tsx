"use client";

import { useAuthStore } from "@/store/authStore";
import {
  HeartOutlined,
  HomeOutlined,
  SafetyCertificateOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { Badge, Button, Input, Layout, Menu, MenuProps, Space } from "antd";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import DropdownUser from "../dropdown/dropdown.user";
import LanguageSelect from "../share/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import useCartStore from "@/store/cartStore";

const { Header: AntHeader } = Layout;
const { Search } = Input;

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useTranslation("common");

  const { isAuthenticated } = useAuthStore();
  const { totalQuantity } = useCartStore();

  const getMenuItems = () => [
    { key: "/", label: t("header.home"), icon: <HomeOutlined /> },
    {
      key: "/vaccine",
      label: t("header.vaccines"),
      icon: <ShoppingOutlined />,
    },
  ];

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    router.push(e.key);
  };

  const onSearch = (value: string) => console.log(value);

  return (
    <AntHeader className="sticky top-0 z-50 !bg-white px-4 shadow-sm md:px-6">
      <div className="mx-auto flex h-full max-w-[1220px] items-center justify-between">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="flex cursor-pointer items-center gap-2 text-xl font-bold text-blue-600 md:text-2xl"
          >
            <SafetyCertificateOutlined className="text-xl md:text-2xl text-brand-primary" />
            <span className="hidden text-lg font-bold text-gray-900 sm:block md:text-xl">
              SafeVax
            </span>
          </Link>

          <Menu
            mode="horizontal"
            onClick={handleMenuClick}
            selectedKeys={[pathname?.split("?")?.[0] ?? ""]}
            items={getMenuItems()}
            style={{
              border: "none",
              background: "transparent",
              minWidth: "300px",
            }}
            className="flex"
          />
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden md:flex md:items-center">
            <Search
              placeholder={t("header.searchPlaceholder")}
              allowClear
              onSearch={onSearch}
            />
          </div>

          <Space className="hidden sm:flex">
            <LanguageSelect />

            <Button
              icon={<HeartOutlined />}
              size="middle"
              onClick={() => router.push("/wishlist")}
              className="hidden border-none shadow-none hover:bg-slate-100 md:flex"
              title={t("header.wishlist")}
            />

            <Badge count={totalQuantity()} size="small" className="mr-1 md:mr-0">
              <Button
                icon={<ShoppingCartOutlined />}
                size="middle"
                onClick={() => router.push("/cart")}
                className="border-none shadow-none hover:bg-slate-100"
                title={t("header.cart")}
              />
            </Badge>
          </Space>

          <div className="hidden md:flex md:items-center md:gap-2">
            {!isAuthenticated ? (
              <>
                <Button
                  onClick={() => router.push("/login")}
                  className="text-sm"
                  size="middle"
                >
                  {t("header.login")}
                </Button>
                <Button
                  type="primary"
                  onClick={() => router.push("/register")}
                  className="bg-blue-600 text-sm hover:bg-blue-700"
                  size="middle"
                >
                  {t("header.register")}
                </Button>
              </>
            ) : (
              <DropdownUser />
            )}
          </div>
        </div>
      </div>
    </AntHeader>
  );
};

export default Header;
