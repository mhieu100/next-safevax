import { Button, Col, Form, Input, Row, Select, Typography, message } from "antd";
import React, { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { updateAccount, UpdateAccountRequest } from "@/services/auth.service";

const { Text, Paragraph } = Typography;

interface EditUserProps {
  editMode: boolean;
  setEditMode: (editMode: boolean) => void 
}

const TabEditUser = ({ editMode, setEditMode }: EditUserProps) => {
  const [form] = Form.useForm();
  const user = useAuthStore(state => state.user);
  const setAuth = useAuthStore(state => state.setAuth);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editMode && user) {
      form.setFieldsValue({
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        birthday: user.birthday,
        gender: user.gender,
        address: user.address,
        identityNumber: user.identityNumber,
        bloodType: user.bloodType,
        heightCm: user.heightCm,
        weightKg: user.weightKg,
        occupation: user.occupation,
        lifestyleNotes: user.lifestyleNotes,
        insuranceNumber: user.insuranceNumber,
      });
    }
  }, [editMode, user, form]);

  interface FormValues {
    fullName: string;
    email: string;
    phone: string;
    birthday: string;
    gender: "MALE" | "FEMALE" | "OTHER";
    address: string;
    identityNumber: string;
    bloodType: "A" | "B" | "AB" | "O";
    heightCm: number;
    weightKg: number;
    occupation: string;
    lifestyleNotes: string;
    insuranceNumber: string;
  }

  const handleSaveProfile = async (values: FormValues) => {
    if (!user) return;
    
    try {
      setLoading(true);

      const payload: UpdateAccountRequest = {
        user: {
          fullName: values.fullName,
        },
        patientProfile: {
          address: values.address,
          phone: values.phone,
          birthday: values.birthday,
          gender: values.gender,
          identityNumber: values.identityNumber,
          bloodType: values.bloodType,
          heightCm: values.heightCm,
          weightKg: values.weightKg,
          occupation: values.occupation,
          lifestyleNotes: values.lifestyleNotes,
          insuranceNumber: values.insuranceNumber,
        },
      };

      const response = await updateAccount(payload);
      
      if (!response?.data) {
        throw new Error("Update failed");
      }

      // Update store with new user data from backend
      const token = localStorage.getItem("token") || "";
      setAuth(response.data, token);

      message.success("Cập nhật thông tin thành công!");
      setEditMode(false);
    } catch (error: unknown) {
      console.error("Update profile error:", error);
      message.error((error as Error)?.message || "Không thể cập nhật thông tin");
    } finally {
      setLoading(false);
    }
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
            gender: user.gender,
            address: user.address,
            identityNumber: user.identityNumber,
            bloodType: user.bloodType,
            heightCm: user.heightCm,
            weightKg: user.weightKg,
            occupation: user.occupation,
            lifestyleNotes: user.lifestyleNotes,
            insuranceNumber: user.insuranceNumber,
          } : undefined}
        >
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Full Name"
                name="fullName"
                rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, type: "email" }]}
              >
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item label="Phone" name="phone">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label="Date of Birth" name="birthday">
                <Input placeholder="YYYY-MM-DD" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item label="Gender" name="gender">
                <Select placeholder="Chọn giới tính">
                  <Select.Option value="MALE">Nam</Select.Option>
                  <Select.Option value="FEMALE">Nữ</Select.Option>
                  <Select.Option value="OTHER">Khác</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label="Identity Number" name="identityNumber">
                <Input placeholder="CCCD/CMND" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={8}>
              <Form.Item label="Blood Type" name="bloodType">
                <Select placeholder="Chọn nhóm máu">
                  <Select.Option value="A">A</Select.Option>
                  <Select.Option value="B">B</Select.Option>
                  <Select.Option value="AB">AB</Select.Option>
                  <Select.Option value="O">O</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item label="Height (cm)" name="heightCm">
                <Input type="number" placeholder="170" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item label="Weight (kg)" name="weightKg">
                <Input type="number" placeholder="65" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Address" name="address">
            <Input.TextArea rows={2} />
          </Form.Item>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item label="Occupation" name="occupation">
                <Input placeholder="Nghề nghiệp" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label="Insurance Number" name="insuranceNumber">
                <Input placeholder="Số bảo hiểm y tế" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Lifestyle Notes" name="lifestyleNotes">
            <Input.TextArea rows={3} placeholder="Ghi chú về lối sống, sở thích..." />
          </Form.Item>

          <div className="flex gap-2">
            <Button type="primary" htmlType="submit" loading={loading} disabled={loading}>
              Save Changes
            </Button>
            <Button onClick={() => setEditMode(false)} disabled={loading}>
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
            <div>
              <Text type="secondary">Gender</Text>
              <div className="text-base font-medium">
                {user?.gender === "MALE" ? "Nam" : user?.gender === "FEMALE" ? "Nữ" : user?.gender === "OTHER" ? "Khác" : "--"}
              </div>
            </div>
            <div>
              <Text type="secondary">Identity Number</Text>
              <div className="text-base font-medium">{user?.identityNumber || "--"}</div>
            </div>
            <div>
              <Text type="secondary">Blood Type</Text>
              <div className="text-base font-medium">{user?.bloodType || "--"}</div>
            </div>
            <div>
              <Text type="secondary">Height</Text>
              <div className="text-base font-medium">{user?.heightCm ? `${user.heightCm} cm` : "--"}</div>
            </div>
            <div>
              <Text type="secondary">Weight</Text>
              <div className="text-base font-medium">{user?.weightKg ? `${user.weightKg} kg` : "--"}</div>
            </div>
            <div>
              <Text type="secondary">Occupation</Text>
              <div className="text-base font-medium">{user?.occupation || "--"}</div>
            </div>
            <div>
              <Text type="secondary">Insurance Number</Text>
              <div className="text-base font-medium">{user?.insuranceNumber || "--"}</div>
            </div>
          </div>

          <div>
            <Text type="secondary">Address</Text>
            <div className="text-base font-medium">{user?.address || "--"}</div>
          </div>

          <div>
            <Text type="secondary">Lifestyle Notes</Text>
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
