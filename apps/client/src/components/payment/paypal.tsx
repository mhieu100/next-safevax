import { WalletOutlined } from "@ant-design/icons";

const PaypalMethod = () => {
  return (
    <div className="py-8 text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
        <WalletOutlined className="text-2xl text-blue-600" />
      </div>
      <span className="text-lg">
        You will be redirected to PayPal to complete your payment
      </span>
    </div>
  );
};

export default PaypalMethod;
