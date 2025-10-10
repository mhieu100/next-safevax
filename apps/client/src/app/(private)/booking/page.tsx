"use client";

import React, { useEffect, useState } from "react";
import TopChekoutSection from "./top-checkout";
import { Form } from "antd";
import PaymentSection from "./payment";
import ReviewSection from "./review";

import { useMessage } from "@/components/share/MessageProvider";
import { useSearchParams } from "next/navigation";
import AppointmentSection from "./appointment";
import { IVaccine } from "@/types/backend";
import { callGetBySku } from "@/services/vaccine.service";
import { callCreateBooking, BookingRequest } from "@/services/booking.service";
import { Dayjs } from "dayjs";

interface DoseScheduleForm {
  date: Dayjs;
  time: string;
  centerId: string;
}

const Booking = () => {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");
  const [vaccine, setVaccine] = useState<IVaccine>();

  useEffect(() => {
    const handleGetVaccine = async (slug: string) => {
      const response = await callGetBySku(slug);
      setVaccine(response.data);
    };
    if (typeof slug === "string") {
      handleGetVaccine(slug);
    }
  }, [slug]);

  const finalTotal = vaccine ? vaccine?.dosesRequired * vaccine?.price : 0;

  const { success, error } = useMessage();

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState("CASH");

  const [loading, setLoading] = useState(false);

  const [bookingForm] = Form.useForm();
  const [paymentForm] = Form.useForm();

  const handlePlaceBooking = async () => {
    setLoading(true);

    try {
      // Validate both forms before proceeding
      await bookingForm.validateFields();
      await paymentForm.validateFields();

      // Get form data
      const appointmentData = bookingForm.getFieldsValue();
      const paymentData = paymentForm.getFieldsValue();
      const doseSchedules = appointmentData.doseSchedules || [];

      console.log("📋 Appointment data:", appointmentData);
      console.log("💳 Payment data:", paymentData);
      console.log("📅 Dose schedules:", doseSchedules);

      // Validate that we have dose schedules
      if (!doseSchedules || doseSchedules.length === 0) {
        error("Vui lòng chọn lịch tiêm cho ít nhất 1 mũi vaccine!");
        return;
      }

      // Transform dose schedules to match backend format
      const transformedSchedules = doseSchedules.map(
        (schedule: DoseScheduleForm) => ({
          date: schedule.date ? schedule.date.format("YYYY-MM-DD") : "",
          time: schedule.time || "",
          centerId: parseInt(schedule.centerId) || 1,
        })
      );

      // Validate first dose schedule
      const firstSchedule = transformedSchedules[0];
      if (!firstSchedule?.date || !firstSchedule?.time) {
        error("Vui lòng chọn đầy đủ ngày và giờ cho mũi tiêm đầu tiên!");
        return;
      }

      // Build payload
      const payload: BookingRequest = {
        vaccineId: vaccine?.id as number,
        familyMemberId:
          appointmentData.bookingFor === "family"
            ? appointmentData.familyMemberId
            : undefined,
        firstDoseDate: firstSchedule.date,
        firstDoseTime: firstSchedule.time,
        amount: finalTotal,
        doseSchedules: transformedSchedules,
        paymentMethod: selectedPayment,
      };

      console.log("🚀 Booking payload:", payload);

      // Validate payload before sending
      if (!payload.vaccineId) {
        error("Không tìm thấy thông tin vaccine!");
        return;
      }

      if (payload.amount <= 0) {
        error("Số tiền thanh toán không hợp lệ!");
        return;
      }

      // API call
      const response = await callCreateBooking(payload);
      if (response && response.data) {
        if (response.data.method === "PAYPAL") {
          window.location.href = response.data.paymentURL;
        } else if (response.data.method === "CASH") {
          success("Đặt lịch thành công!");
          bookingForm.resetFields();
          paymentForm.resetFields();
          // Redirect to success page or show confirmation
        }
      }
    } catch (err) {
      console.error("❌ Booking error:", err);
      
      // Handle form validation errors
      if (err && typeof err === 'object' && 'errorFields' in err) {
        error("Vui lòng kiểm tra và điền đầy đủ thông tin!");
        return;
      }
      
      // Handle API errors
      const errorMessage = 
        (err && typeof err === 'object' && 'response' in err && 
         err.response && typeof err.response === 'object' && 'data' in err.response &&
         err.response.data && typeof err.response.data === 'object' && 'message' in err.response.data) 
        ? String(err.response.data.message)
        : (err && typeof err === 'object' && 'message' in err) 
        ? String(err.message)
        : "Lỗi không xác định";
      
      error(`Đặt lịch thất bại: ${errorMessage}`);
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
        {currentStep === 0 && (
          <AppointmentSection
            bookingForm={bookingForm}
            vaccine={vaccine as IVaccine}
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
            bookingForm={bookingForm}
            vaccine={vaccine as IVaccine}
            finalTotal={finalTotal}
            loading={loading}
            selectedPayment={selectedPayment}
            paymentForm={paymentForm}
            setCurrentStep={setCurrentStep}
            handlePlaceBooking={handlePlaceBooking}
          />
        )}
      </div>
    </div>
  );
};

export default Booking;
