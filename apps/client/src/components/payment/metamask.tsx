import { useMessage } from "@/components/share/MessageProvider";
import { CopyOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import React from "react";

const MetaMaskMethod = () => {
  const { success } = useMessage();
  return (
    <div className="mt-6 bg-gray-50 p-6 rounded-lg">
      <Form.Item label="Địa chỉ ví">
        <Input.Search
          value="0x672DF7fDcf5dA93C30490C7d49bd6b5bF7B4D32C"
          readOnly
          enterButton={<CopyOutlined />}
          onSearch={() => {
            navigator.clipboard.writeText(
              "0x672DF7fDcf5dA93C30490C7d49bd6b5bF7B4D32C"
            );
            success("Đã sao chép địa chỉ ví");
          }}
        />
      </Form.Item>
    </div>
  );
};

export default MetaMaskMethod;
