import { Form, Input } from "antd";
import React from "react";

const CashMethod = () => {
  return (
    <div className="mt-6 bg-gray-50 p-6 rounded-lg">
    
      <Form.Item label="Ghi chú" name="cashNote">
        <Input.TextArea
          placeholder="Ghi chú thêm cho nhân viên (nếu có)"
          rows={3}
        />
      </Form.Item>
    </div>
  );
};

export default CashMethod;
