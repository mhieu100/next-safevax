import { IVaccine } from "@/types/backend";
import { Tabs, Typography } from "antd";
import React from "react";

const { Title, Paragraph } = Typography;
const { TabPane } = Tabs;

interface DescriptionVaccineProps {
  vaccine: IVaccine;
}

const DescriptionVaccineSection = ({ vaccine }: DescriptionVaccineProps) => {
  return (
    <div className="mt-12">
      <Tabs defaultActiveKey="1" >
        <TabPane tab="Description" key="1">
          <div className="py-6">
            <Title level={3}>Product Description</Title>
            <Paragraph className="text-base leading-relaxed">
              {vaccine.description ||
                "This premium product is designed with the highest quality materials and craftsmanship. It offers exceptional performance, durability, and value for money. Whether you're a professional or enthusiast, this product will exceed your expectations."}
            </Paragraph>
            <Paragraph className="text-base leading-relaxed">
              Our commitment to quality ensures that every product meets
              rigorous standards before reaching our customers. With attention
              to detail and innovative design, this product represents the
              perfect balance of functionality and style.
            </Paragraph>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default DescriptionVaccineSection;
