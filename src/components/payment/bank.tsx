import { useMessage } from "@/components/share/MessageProvider";
import { CopyOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import React from "react";

const BankMethod = () => {
  const { success } = useMessage();
  return (
    <div className="mt-6 bg-gray-50 p-6 rounded-lg">
      <Form.Item label="Số tài khoản">
        <Input.Search
          value="9704198526191432198"
          readOnly
          enterButton={<CopyOutlined />}
          onSearch={() => {
            navigator.clipboard.writeText("9704198526191432198");
            success("Đã sao chép số tài khoản");
          }}
        />
      </Form.Item>
      <Form.Item label="Chủ tài khoản">
        <Input value="CÔNG TY TNHH THƯƠNG MẠI NCB" readOnly />
      </Form.Item>
      <Form.Item label="Ngân hàng">
        <Input value="NCB Bank - Chi nhánh Hà Nội" readOnly />
      </Form.Item>
   
    </div>
  );
};

export default BankMethod;
