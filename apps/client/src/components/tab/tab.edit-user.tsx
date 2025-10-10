import { Button, Col, Form, Input, Row, Typography } from "antd";
import React from "react";

const { Text, Paragraph } = Typography;

interface EditUserProps {
  editMode: boolean;
  setEditMode: (editMode: boolean) => void 
}

const TabEditUser = ({ editMode, setEditMode }: EditUserProps) => {
  const [form] = Form.useForm();

  //   const handleSaveProfile = (values) => {
  //     console.log('Saving profile:', values);
  //     setEditMode(false);
  //     // Here you would dispatch an action to update user profile
  //   };
  
  return (
    <div className="py-4">
      {editMode ? (
        <Form
          form={form}
          layout="vertical"
          // onFinish={handleSaveProfile}
          initialValues={{
            name: "John Doe",
            email: "john.doe@example.com",
            phone: "+1 (555) 123-4567",
            address: "123 Main St, City, State 12345",
            bio: "I love shopping for quality products and discovering new brands.",
          }}
        >
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Full Name"
                name="name"
                rules={[{ required: true }]}
              >
                <Input  />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, type: "email" }]}
              >
                <Input  />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item label="Phone" name="phone">
                <Input  />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label="Date of Birth" name="birthday">
                <Input  placeholder="MM/DD/YYYY" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Address" name="address">
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item label="Bio" name="bio">
            <Input.TextArea rows={4} placeholder="Tell us about yourself..." />
          </Form.Item>

          <div className="flex gap-2">
            <Button type="primary" htmlType="submit" >
              Save Changes
            </Button>
            <Button  onClick={() => setEditMode(false)}>
              Cancel
            </Button>
          </div>
        </Form>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Text type="secondary">Full Name</Text>
              <div className="text-base font-medium">{"John Doe"}</div>
            </div>
            <div>
              <Text type="secondary">Email</Text>
              <div className="text-base font-medium">
                {"john.doe@example.com"}
              </div>
            </div>
            <div>
              <Text type="secondary">Phone</Text>
              <div className="text-base font-medium">+1 (555) 123-4567</div>
            </div>
            <div>
              <Text type="secondary">Date of Birth</Text>
              <div className="text-base font-medium">January 15, 1990</div>
            </div>
          </div>

          <div>
            <Text type="secondary">Address</Text>
            <div className="text-base font-medium">
              123 Main St, City, State 12345
            </div>
          </div>

          <div>
            <Text type="secondary">Bio</Text>
            <Paragraph className="text-base">
              I love shopping for quality products and discovering new brands.
              Always looking for the best deals and latest trends.
            </Paragraph>
          </div>
        </div>
      )}
    </div>
  );
};

export default TabEditUser;
