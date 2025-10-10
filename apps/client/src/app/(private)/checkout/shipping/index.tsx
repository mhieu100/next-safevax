import {
  Row,
  Col,
  Card,
  Typography,
  Button,
  Form,
  Input,
  Select,
  Radio,
  FormInstance,
} from "antd";
import {
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
  UserOutlined,
  TruckOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
const { Title, Text } = Typography;

interface ShippingProps {
  subtotal: number;
  selectedShipping: string;
  setSelectedShipping: (selectedShipping: string) => void;
  shippingForm: FormInstance;
  setCurrentStep: (currentStep: number) => void;
}

const ShippingSection = ({
  subtotal,
  selectedShipping,
  setSelectedShipping,
  shippingForm,
  setCurrentStep,
}: ShippingProps) => {
  const handleShippingNext = async () => {
    try {
      await shippingForm.validateFields();
      setCurrentStep(1);
    } catch (error) {
      console.log("Validation failed:", error);
    }
  };

  const shippingOptions = [
    {
      id: "standard",
      name: "Standard Shipping",
      description: "5-7 business days",
      price: subtotal > 1000000 ? 0 : 100000,
      icon: <TruckOutlined />,
    },
    {
      id: "express",
      name: "Express Shipping",
      description: "2-3 business days",
      price: 15.99,
      icon: <ClockCircleOutlined />,
    },
  ];

  return (
    <Card className="rounded-xl shadow-sm border-0">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
          <TruckOutlined className="text-blue-600" />
        </div>
        <Title level={3} className="mb-0">
          Shipping Information
        </Title>
      </div>

      <Form
        form={shippingForm}
        layout="vertical"
        initialValues={{
          firstName: "Nguyen",
          lastName: "Hieu",
          email: "hieunguyen@gmail.com",
          phone: "0388335845",
          address: "Da Nang",
          city: "Da Nang City",
          state: "CA",
          zipCode: "50000"
        }}
      >
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[
                { required: true, message: "Please enter your first name" },
              ]}
            >
              <Input  prefix={<UserOutlined />} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[
                { required: true, message: "Please enter your last name" },
              ]}
            >
              <Input  prefix={<UserOutlined />} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Email Address"
              name="email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input  prefix={<MailOutlined />} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[
                { required: true, message: "Please enter your phone number" },
              ]}
            >
              <Input  prefix={<PhoneOutlined />} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Street Address"
          name="address"
          rules={[{ required: true, message: "Please enter your address" }]}
        >
          <Input  prefix={<EnvironmentOutlined />} />
        </Form.Item>

        <Row gutter={16}>
          <Col xs={24} sm={8}>
            <Form.Item
              label="City"
              name="city"
              rules={[{ required: true, message: "Please enter your city" }]}
            >
              <Input  />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item
              label="State"
              name="state"
              rules={[{ required: true, message: "Please select your state" }]}
            >
              <Select  placeholder="Select state">
                <Select.Option value="CA">California</Select.Option>
                <Select.Option value="NY">New York</Select.Option>
                <Select.Option value="TX">Texas</Select.Option>
                <Select.Option value="FL">Florida</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item
              label="ZIP Code"
              name="zipCode"
              rules={[
                { required: true, message: "Please enter your ZIP code" },
              ]}
            >
              <Input  />
            </Form.Item>
          </Col>
        </Row>

        <div className="mt-8">
          <Title level={4} className="mb-4">
            Shipping Method
          </Title>
          <Radio.Group
            value={selectedShipping}
            onChange={(e) => setSelectedShipping(e.target.value)}
            className="w-full"
          >
            <div className="!space-y-3">
              {shippingOptions.map((option) => (
                <Radio.Button
                  key={option.id}
                  value={option.id}
                  className="!w-full !h-auto p-0 border-gray-200"
                >
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <div className="text-lg text-blue-600">{option.icon}</div>
                      <div>
                        <Text strong className="block">
                          {option.name}
                        </Text>
                        <Text type="secondary" className="text-sm">
                          {option.description}
                        </Text>
                      </div>
                    </div>
                    <div className="text-right">
                      <Text strong className="text-lg">
                        {option.price === 0 ? "FREE" : `$${option.price}`}
                      </Text>
                      {option.price === 0 && (
                        <Text type="secondary" className="block text-xs">
                          Orders over 100.000đ
                        </Text>
                      )}
                    </div>
                  </div>
                </Radio.Button>
              ))}
            </div>
          </Radio.Group>
        </div>

        <div className="flex justify-end mt-8">
          <Button
            type="primary"
            onClick={handleShippingNext}
            className="px-8 rounded-lg"
          >
            Continue to Payment
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default ShippingSection;
