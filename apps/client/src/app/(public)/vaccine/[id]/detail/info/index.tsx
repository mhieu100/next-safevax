/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { formatPrice } from "@/utils/formatPrice";
import {
  Row,
  Col,
  Typography,
  Button,
  InputNumber,
  Card,
  Image,
  Rate,
  Badge,
} from "antd";
import {
  ShoppingCartOutlined,
  HeartOutlined,
  ShareAltOutlined,
  CheckCircleOutlined,
  TruckOutlined,
  SafetyOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import useCartStore from "@/store/cartStore";
import { useMessage } from "@/components/share/MessageProvider";
import { IVaccine } from "@/types/backend";

const { Title, Text, Paragraph } = Typography;

interface VaccineInfoProps {
  vaccine: IVaccine;
}

const VaccineInfoSection = ({ vaccine }: VaccineInfoProps) => {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const { success } = useMessage();

  const { addItem } = useCartStore();

  const vaccineImages = [
    vaccine?.image,
    "https://vnvc.vn/wp-content/uploads/2017/04/vac-xin-rotarix.jpg",
    "https://vnvc.vn/wp-content/uploads/2017/04/vac-xin-twinrix.jpg",
  ];

  const features = [
    "High Quality Materials",
    "Fast Shipping Available",
    "30-Day Return Policy",
    "Warranty Included",
    "Customer Support 24/7",
  ];

  const handleAddToCart = () => {
    addItem(vaccine, quantity);
    success("Add vaccine to cart success");
  };

  const handleBuyNow = () => {
    router.push("/cart");
  };
  return (
    <Row gutter={[32, 32]}>
      <Col xs={24} lg={12}>
        <div className="sticky top-6">
          <div className="mb-4">
            <Image
              src={vaccineImages[selectedImage]}
              alt={vaccine.name}
              className="w-full rounded-xl"
              style={{ maxHeight: "500px", objectFit: "cover" }}
            />
          </div>

          <div className="grid grid-cols-4 gap-2">
            {vaccineImages.map((img, index) => (
              <div
                key={index}
                className={`cursor-pointer rounded-lg overflow-hidden border-2 ${
                  selectedImage === index
                    ? "border-blue-500"
                    : "border-gray-200"
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={img}
                  alt={`${vaccine.name} ${index + 1}`}
                  className="w-full h-20 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </Col>

      <Col xs={24} lg={12}>
        <div className="space-y-6">
          <div>
            <p className="text-sm uppercase tracking-wide">{vaccine.country}</p>
            <Title level={1} className="mb-2">
              {vaccine.name}
            </Title>

            <div className="flex items-center gap-4 mb-4">
              <Rate disabled defaultValue={vaccine.rating || 4.5} />
              <Text type="secondary">({vaccine.reviews || 128} reviews)</Text>
              <Badge
                count={vaccine.stock > 0 ? "In Stock" : "Out of Stock"}
                style={{
                  backgroundColor: vaccine.stock > 0 ? "#52c41a" : "#ff4d4f",
                }}
              />
            </div>

            <div className="flex items-center gap-4 mb-6">
              <Title level={2} className="text-blue-600 m-0">
                {formatPrice(vaccine.price || 0)}
              </Title>
            </div>
          </div>

          <div>
            <Paragraph className="text-gray-600 text-base leading-relaxed">
              {vaccine.descriptionShort ||
                "This is a premium quality product designed to meet your needs. Crafted with attention to detail and built to last, it offers exceptional value and performance."}
            </Paragraph>
          </div>

          <div>
            <Title level={4}>Key Features</Title>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircleOutlined className="text-green-500" />
                  <Text>{feature}</Text>
                </div>
              ))}
            </div>
          </div>

          <Card className="rounded-xl bg-gray-50">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Text strong>Quantity:</Text>
                <InputNumber
                  min={1}
                  max={vaccine.stock}
                  value={quantity}
                  onChange={(value) => setQuantity(value ?? 1)}
                                  />
                <Text type="secondary">{vaccine.stock} available</Text>
              </div>

              <div className="flex gap-3">
                <Button
                  type="primary"
                                    icon={<ShoppingCartOutlined />}
                  onClick={handleAddToCart}
                  disabled={vaccine.stock === 0}
                  className="flex-1"
                >
                  Add to Cart
                </Button>
                <Button
                                    onClick={handleBuyNow}
                  disabled={vaccine.stock === 0}
                  icon={<ClockCircleOutlined />}
                  className="flex-1 bg-orange-500 text-white border-orange-500 hover:bg-orange-600"
                >
                  Booking Now
                </Button>
              </div>

              <div className="flex gap-2">
                <Button icon={<HeartOutlined />} className="flex-1">
                  Add to Wishlist
                </Button>
                <Button icon={<ShareAltOutlined />} className="flex-1">
                  Share
                </Button>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <TruckOutlined className="text-2xl text-blue-600 mb-2" />
              <Text strong className="block">
                Free Shipping
              </Text>
              <Text type="secondary" className="text-sm">
                On orders over $50
              </Text>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <SafetyOutlined className="text-2xl text-green-600 mb-2" />
              <Text strong className="block">
                Secure Payment
              </Text>
              <Text type="secondary" className="text-sm">
                SSL encrypted
              </Text>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <CheckCircleOutlined className="text-2xl text-orange-600 mb-2" />
              <Text strong className="block">
                Easy Returns
              </Text>
              <Text type="secondary" className="text-sm">
                30-day policy
              </Text>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default VaccineInfoSection;
