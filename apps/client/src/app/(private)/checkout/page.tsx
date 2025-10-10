"use client";

import React, { useState } from "react";
import TopChekoutSection from "./top-checkout";
import { Col, Form, Row } from "antd";
import ShippingSection from "./shipping";
import PaymentSection from "./payment";
import ReviewSection from "./review";
import {
  BankOutlined,
  DollarOutlined,
  PayCircleOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import useCartStore from "@/store/cartStore";
import SumarySection from "./sumary";
import { callCreateOrder, OrderRequest } from "@/services/order.service";
import { useMessage } from "@/components/share/MessageProvider";
import { useRouter } from "next/navigation";


const Checkout = () => {
  const router = useRouter();

  const { items, clearCart, totalQuantity, totalPrice } = useCartStore();
  const { success, error } = useMessage();
  const [discount, setDiscount] = useState(0);

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState("CASH");
  const [selectedShipping, setSelectedShipping] = useState("standard");

  const [loading, setLoading] = useState(false);

  const [shippingForm] = Form.useForm();
  const [paymentForm] = Form.useForm();

  const subtotal = totalPrice();
  const shippingCost =
    selectedShipping === "express" ? 15.99 : subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const discountAmount = subtotal * (discount / 100);
  const finalTotal = subtotal + shippingCost + tax - discountAmount;

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (totalQuantity() < 1) {
        error("Please add vaccine to cart");
        router.push("/cart");
        return;
      }

      const payload: OrderRequest = {
        items: items.map((item) => ({
          id: item.vaccine.id,
          quantity: item.quantity,
        })),
        itemCount: totalQuantity(),
        paymentMethod: selectedPayment,
        totalAmount: finalTotal.toFixed(2),
      };

      const response = await callCreateOrder(payload);
      if (response && response.data) {
        if (response.data.method === "PAYPAL") {
          window.location.href = response.data.paymentURL;
        } else if (response.data.method === "CASH") {
          router.push("/success");
          success("Order placed successfully!");
          shippingForm.resetFields();
          paymentForm.resetFields();
        }
      }
      clearCart();
    } catch (err) {
      error("Failed to place order. Please try again." + err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <TopChekoutSection
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={16}>
            {currentStep === 0 && (
              <ShippingSection
                subtotal={subtotal}
                selectedShipping={selectedShipping}
                setSelectedShipping={setSelectedShipping}
                shippingForm={shippingForm}
                setCurrentStep={setCurrentStep}
              />
            )}
            {currentStep === 1 && (
              <PaymentSection
                selectedPayment={selectedPayment}
                setSelectedPayment={setSelectedPayment}
                paymentForm={paymentForm}
                setCurrentStep={setCurrentStep}
              />
            )}
            {currentStep === 2 && (
              <ReviewSection
                loading={loading}
                finalTotal={finalTotal}
                selectedPayment={selectedPayment}
                paymentForm={paymentForm}
                shippingForm={shippingForm}
                setCurrentStep={setCurrentStep}
                handlePlaceOrder={handlePlaceOrder}
              />
            )}
          </Col>
          <Col xs={24} lg={8}>
            <SumarySection
              discount={discount}
              setDiscount={setDiscount}
              subtotal={subtotal}
              shippingCost={shippingCost}
              tax={tax}
              discountAmount={discountAmount}
              finalTotal={finalTotal}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Checkout;
