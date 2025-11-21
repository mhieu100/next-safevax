import {
  BankOutlined,
  DollarOutlined,
  PayCircleOutlined,
  WalletOutlined,
} from "@ant-design/icons";

export const paymentMethods = [
  {
    icon: <WalletOutlined className="text-blue-600" />,
    name: "MetaMask",
    description: "Pay with ETH via MetaMask wallet",
    id: "METAMASK",
  },
  {
    icon: <PayCircleOutlined className="text-blue-400" />,
    name: "PayPal",
    description: "Payment via PayPal account",
    id: "PAYPAL",
  },
  {
    icon: <BankOutlined className="text-green-600" />,
    name: "Bank",
    description: "Chuyển khoản ngân hàng",
    id: "BANK",
  },
  {
    icon: <DollarOutlined className="text-green-600" />,
    name: "Cash",
    description: "Thanh toán khi nhận hàng (COD)",
    id: "CASH",
  },
];
