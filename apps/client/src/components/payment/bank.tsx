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
          value="1234567890"
          readOnly
          enterButton={<CopyOutlined />}
          onSearch={() => {
            navigator.clipboard.writeText("1234567890");
            success("Đã sao chép số tài khoản");
          }}
        />
      </Form.Item>
      <Form.Item label="Chủ tài khoản">
        <Input value="CÔNG TY TNHH THƯƠNG MẠI ABC" readOnly />
      </Form.Item>
      <Form.Item label="Ngân hàng">
        <Input value="Vietcombank - Chi nhánh Hà Nội" readOnly />
      </Form.Item>
      <Form.Item label="Nội dung chuyển khoản">
        <Input.Search
          value="Thanh toan don hang #12345"
          readOnly
          enterButton={<CopyOutlined />}
          onSearch={() => {
            navigator.clipboard.writeText("Thanh toan don hang #12345");
            success("Đã sao chép nội dung chuyển khoản");
          }}
        />
      </Form.Item>
    </div>
  );
};

export default BankMethod;
