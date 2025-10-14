import { Button, Col, Form, Input, Row, Typography, message } from "antd";
import React, { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { IUser } from "@/types/backend";

const { Text, Paragraph } = Typography;

interface EditUserProps {
  editMode: boolean;
  setEditMode: (editMode: boolean) => void 
}

const TabEditUser = ({ editMode, setEditMode }: EditUserProps) => {
  const [form] = Form.useForm();
  const user = useAuthStore(state => state.user);
  const setAuth = useAuthStore(state => state.setAuth);

  useEffect(() => {
    if (editMode && user) {
      form.setFieldsValue({
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        birthday: user.birthday,
        address: user.address,
        bio: user.lifestyleNotes,
      });
    }
  }, [editMode, user, form]);

  interface FormValues {
    fullName: string;
    email: string;
    phone: string;
    birthday: string;
    address: string;
    bio: string;
  }

  const handleSaveProfile = (values: FormValues) => {
    if (!user) return;
    const updatedUser = {
      ...user,
      fullName: values.fullName,
      email: values.email,
      phone: values.phone,
      birthday: values.birthday,
      address: values.address,
      lifestyleNotes: values.bio,
    };
    const token = localStorage.getItem("token") || "";
    setAuth(updatedUser as unknown as IUser, token);
    message.success("Cập nhật thông tin thành công");
    setEditMode(false);
    // TODO: Call API to persist changes when backend endpoint is ready
  };

  return (
    <div className="py-4">
      {editMode ? (
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSaveProfile}
          initialValues={user ? {
            fullName: user.fullName,
            email: user.email,
            phone: user.phone,
            birthday: user.birthday,
            address: user.address,
            bio: user.lifestyleNotes,
          } : undefined}
        >
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Full Name"
                name="fullName"
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
                <Input  placeholder="YYYY-MM-DD" />
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
              <div className="text-base font-medium">{user?.fullName || "--"}</div>
            </div>
            <div>
              <Text type="secondary">Email</Text>
              <div className="text-base font-medium">{user?.email || "--"}</div>
            </div>
            <div>
              <Text type="secondary">Phone</Text>
              <div className="text-base font-medium">{user?.phone || "--"}</div>
            </div>
            <div>
              <Text type="secondary">Date of Birth</Text>
              <div className="text-base font-medium">{user?.birthday || "--"}</div>
            </div>
          </div>

          <div>
            <Text type="secondary">Address</Text>
            <div className="text-base font-medium">{user?.address || "--"}</div>
          </div>

          <div>
            <Text type="secondary">Bio</Text>
            <Paragraph className="text-base whitespace-pre-line">{user?.lifestyleNotes || "--"}</Paragraph>
          </div>

          <div>
            <Button type="primary" onClick={() => setEditMode(true)} disabled={!user}>
              Edit Profile
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TabEditUser;
