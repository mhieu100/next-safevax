/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";
import TopChekoutSection from "./top-checkout";
import { Form, Card, Row, Col, Typography, Divider, Tag } from "antd";
import PaymentSection from "./payment";
import ReviewSection from "./review";

import { useMessage } from "@/components/share/MessageProvider";
import { useRouter, useSearchParams } from "next/navigation";
import AppointmentSection from "./appointment";
import { BookingRequest, IBookingData, IDoseSchedule, IVaccine } from "@/types/backend";
import { callGetBySku } from "@/services/vaccine.service";
import { callCreateBooking } from "@/services/booking.service";

import { formatPrice } from "@/utils/formatPrice";
import dayjs from "dayjs";

const { Title, Text } = Typography;

const Booking = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");

  // Centralized booking state
  const [bookingData, setBookingData] = useState<IBookingData>({
    vaccine: null,
    appointmentData: {
      bookingFor: "self",
      doseSchedules: [],
    },
    paymentData: {
      selectedPayment: "CASH",
    },
    finalTotal: 0,
    isCompleted: false,
  });

  useEffect(() => {
    const handleGetVaccine = async (slug: string) => {
      const response = await callGetBySku(slug);
      setBookingData((prev) => ({
        ...prev,
        vaccine: response.data || null,
        finalTotal: response.data
          ? response.data.dosesRequired * response.data.price
          : 0,
      }));
    };
    if (typeof slug === "string") {
      handleGetVaccine(slug);
    }
  }, [slug]);

  const { success, error } = useMessage();

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState("CASH");

  const [loading, setLoading] = useState(false);

  const [bookingForm] = Form.useForm();
  const [paymentForm] = Form.useForm();

  // Sync data from forms to central state
  useEffect(() => {
    const appointmentData = bookingForm.getFieldsValue();
    const paymentData = paymentForm.getFieldsValue();

    setBookingData((prev) => ({
      ...prev,
      appointmentData: {
        ...prev.appointmentData,
        ...appointmentData,
      },
      paymentData: {
        ...prev.paymentData,
        ...paymentData,
        selectedPayment: selectedPayment,
      },
    }));
  }, [bookingForm, paymentForm, selectedPayment]);

  // Watch form changes and update central state
  const watchAppointmentForm = () => {
    return bookingForm.getFieldsValue();
  };

  const watchPaymentForm = () => {
    return paymentForm.getFieldsValue();
  };

  // Real-time data sync
  useEffect(() => {
    const interval = setInterval(() => {
      const appointmentData = watchAppointmentForm();
      const paymentData = watchPaymentForm();

      // Update central state if there are changes
      setBookingData((prev) => {
        const newAppointmentData = {
          ...prev.appointmentData,
          ...appointmentData,
        };
        const newPaymentData = {
          ...prev.paymentData,
          ...paymentData,
          selectedPayment,
        };

        // Check if there are actual changes to prevent unnecessary re-renders
        if (
          JSON.stringify(newAppointmentData) !==
            JSON.stringify(prev.appointmentData) ||
          JSON.stringify(newPaymentData) !== JSON.stringify(prev.paymentData)
        ) {
          return {
            ...prev,
            appointmentData: newAppointmentData,
            paymentData: newPaymentData,
            isCompleted:
              currentStep === 2 &&
              appointmentData.doseSchedules?.length ===
                prev.vaccine?.dosesRequired,
          };
        }
        return prev;
      });
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, [selectedPayment, currentStep, bookingData]);

  const handlePlaceBooking = async () => {
    setLoading(true);

    try {
      // Validate both forms before proceeding
      await bookingForm.validateFields();
      await paymentForm.validateFields();

      // Use centralized booking data instead of form data
      const { appointmentData, paymentData, vaccine, finalTotal } = bookingData;
      const doseSchedules = appointmentData.doseSchedules || [];

      console.log("📋 Centralized booking data:", bookingData);
      console.log("📋 Appointment data:", appointmentData);
      console.log("💳 Payment data:", paymentData);
      console.log("📅 Dose schedules:", doseSchedules);

      // Validate that we have vaccine
      if (!vaccine) {
        error("Không tìm thấy thông tin vaccine!");
        return;
      }

      // Validate that we have dose schedules
      if (!doseSchedules || doseSchedules.length === 0) {
        error("Vui lòng chọn lịch tiêm cho ít nhất 1 mũi vaccine!");
        return;
      }

      // Validate schedule completeness
      if (doseSchedules.length !== vaccine.dosesRequired) {
        error(`Vui lòng đặt lịch đầy đủ ${vaccine.dosesRequired} mũi tiêm!`);
        return;
      }

      // Validate first dose schedule
      const firstSchedule = doseSchedules[0];
      if (
        !firstSchedule?.date ||
        !firstSchedule?.time ||
        !firstSchedule?.centerId
      ) {
        error("Vui lòng chọn đầy đủ thông tin cho mũi tiêm đầu tiên!");
        return;
      }

      // Transform dose schedules cho các mũi từ mũi 2 trở đi (không bao gồm mũi 1)
      const remainingSchedules = doseSchedules
        .slice(1)
        .map((schedule: IDoseSchedule) => ({
          date: schedule.date
            ? typeof schedule.date === "string"
              ? schedule.date
              : schedule.date.format("YYYY-MM-DD")
            : "",
          time: schedule.time || "",
          centerId: parseInt(String(schedule.centerId)),
        }));

      // Build payload using centralized booking data
      const payload: BookingRequest = {
        vaccineId: vaccine.id,
        familyMemberId:
          appointmentData.bookingFor === "family"
            ? appointmentData.familyMemberId
            : undefined,
        centerId: parseInt(String(firstSchedule.centerId)), // Center ID của mũi tiêm đầu tiên
        firstDoseDate: firstSchedule.date
          ? typeof firstSchedule.date === "string"
            ? firstSchedule.date
            : firstSchedule.date.format("YYYY-MM-DD")
          : "",
        firstDoseTime: firstSchedule.time || "",
        amount: finalTotal,
        doseSchedules: remainingSchedules, // Chỉ chứa các mũi từ mũi 2 trở đi
        paymentMethod:
          bookingData.paymentData.selectedPayment || selectedPayment,
      };

      console.log("🚀 Booking payload from centralized data:", payload);

      // Validate payload before sending
      if (!payload.vaccineId) {
        error("Không tìm thấy thông tin vaccine!");
        return;
      }

      if (payload.amount <= 0) {
        error("Số tiền thanh toán không hợp lệ!");
        return;
      }

      // Validate all remaining schedules have data
      const incompleteSchedules = remainingSchedules.filter(
        (schedule: { date: string; time: string; centerId: number }) =>
          !schedule.date || !schedule.time || !schedule.centerId
      );

      if (incompleteSchedules.length > 0) {
        error(
          `Còn ${incompleteSchedules.length} mũi tiêm chưa đặt lịch đầy đủ!`
        );
        return;
      }
      // API call
      const response = await callCreateBooking(payload);
      if (response && response.data) {
        // Update booking data state to completed
        setBookingData((prev) => ({
          ...prev,
          isCompleted: true,
        }));

        if (response.data.method === "PAYPAL") {
          // Store booking completion state before redirect
          sessionStorage.setItem("bookingCompleted", "true");
          sessionStorage.setItem("bookingData", JSON.stringify(bookingData));
          window.location.href = response.data.paymentURL;
        } else if (response.data.method === "CASH") {
          router.push("/success");
          success("Booking placed successfully!");

          // Reset forms after successful booking
          bookingForm.resetFields();
          paymentForm.resetFields();

          // Reset selected payment
          setSelectedPayment("CASH");

          // Optional: Show booking summary or redirect
          console.log("✅ Booking completed successfully with data:", {
            bookingResponse: response.data.method,
            vaccine: vaccine.name,
            totalAmount: finalTotal,
            schedulesCount: doseSchedules.length,
            paymentMethod: payload.paymentMethod,
          });

          // Redirect to success page or show confirmation modal
          // router.push(`/booking/success?bookingId=${response.data.id}`);
        }
      } else {
        error("Không nhận được phản hồi từ server. Vui lòng thử lại!");
      }
    } catch (err) {
      console.error("❌ Booking error:", err);

      // Handle form validation errors
      if (err && typeof err === "object" && "errorFields" in err) {
        error("Vui lòng kiểm tra và điền đầy đủ thông tin!");
        return;
      }

      // Handle API errors
      const errorMessage =
        err &&
        typeof err === "object" &&
        "response" in err &&
        err.response &&
        typeof err.response === "object" &&
        "data" in err.response &&
        err.response.data &&
        typeof err.response.data === "object" &&
        "message" in err.response.data
          ? String(err.response.data.message)
          : err && typeof err === "object" && "message" in err
          ? String(err.message)
          : "Lỗi không xác định";

      error(`Đặt lịch thất bại: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  // Component hiển thị chi tiết lịch tiêm
  const DoseScheduleDetail = ({
    doseSchedules,
  }: {
    doseSchedules: IDoseSchedule[];
  }) => {
    if (!doseSchedules || doseSchedules.length === 0) return null;

    return (
      <Card size="small" title="📋 Chi tiết lịch tiêm" className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {doseSchedules.map((schedule, index) => {
            const scheduleDate = schedule.date ? dayjs(schedule.date) : null;
            return (
              <div
                key={index}
                className={`p-3 rounded-lg border-2 transition-all ${
                  index === 0
                    ? "border-blue-300 bg-blue-50"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                      index === 0 ? "bg-blue-500" : "bg-gray-400"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <Text strong className="text-sm">
                    Mũi {index + 1}
                    {index === 0 && (
                      <span className="text-blue-600 ml-1">(Đầu tiên)</span>
                    )}
                  </Text>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <Text type="secondary">Ngày:</Text>
                    <Text strong>
                      {scheduleDate
                        ? scheduleDate.format("DD/MM/YYYY")
                        : "Chưa chọn"}
                    </Text>
                  </div>
                  <div className="flex justify-between">
                    <Text type="secondary">Giờ:</Text>
                    <Text strong>{schedule.time || "Chưa chọn"}</Text>
                  </div>
                  <div className="flex justify-between">
                    <Text type="secondary">Trung tâm:</Text>
                    <Text strong className="text-xs">
                      ID: {schedule.centerId || "Chưa chọn"}
                    </Text>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    );
  };

  // Component hiển thị tổng hợp data từ tất cả steps
  const BookingDataSummary = () => {
    if (!bookingData.vaccine) return null;

    const appointmentData = bookingForm.getFieldsValue();
    const doseSchedules = appointmentData.doseSchedules || [];

    return (
      <div className="mb-6 space-y-4">
        {/* Main Summary Card */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <Title
            level={4}
            className="text-blue-800 mb-4 flex items-center gap-2"
          >
            📊 Tổng hợp thông tin đặt lịch
            <Tag
              color={
                doseSchedules.length === bookingData.vaccine.dosesRequired
                  ? "green"
                  : "orange"
              }
            >
              {doseSchedules.length}/{bookingData.vaccine.dosesRequired} mũi
            </Tag>
            <Tag color={bookingData.isCompleted ? "green" : "processing"}>
              {bookingData.isCompleted ? "Hoàn thành" : "Đang thực hiện"}
            </Tag>
          </Title>

          <Row gutter={[16, 16]}>
            {/* Vaccine Info */}
            <Col xs={24} lg={8}>
              <Card
                size="small"
                title="💉 Thông tin Vaccine"
                className="h-full"
              >
                <div className="space-y-2">
                  <Text strong className="block text-blue-700">
                    {bookingData.vaccine.name}
                  </Text>
                  <div className="flex justify-between">
                    <Text type="secondary">Xuất xứ:</Text>
                    <Text strong>{bookingData.vaccine.country}</Text>
                  </div>
                  <div className="flex justify-between">
                    <Text type="secondary">Số mũi:</Text>
                    <Text strong>{bookingData.vaccine.dosesRequired}</Text>
                  </div>
                  <div className="flex justify-between">
                    <Text type="secondary">Khoảng cách:</Text>
                    <Text strong>{bookingData.vaccine.duration} ngày</Text>
                  </div>
                  <div className="flex justify-between">
                    <Text type="secondary">Giá/mũi:</Text>
                    <Text strong className="text-green-600">
                      {formatPrice(bookingData.vaccine.price)}
                    </Text>
                  </div>
                  <Divider className="my-2" />
                  <div className="flex justify-between">
                    <Text strong>Tổng tiền:</Text>
                    <Text strong className="text-red-600 text-lg">
                      {formatPrice(bookingData.finalTotal)}
                    </Text>
                  </div>
                </div>
              </Card>
            </Col>

            {/* Appointment Info */}
            <Col xs={24} lg={8}>
              <Card
                size="small"
                title="📅 Thông tin lịch hẹn"
                className="h-full"
              >
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Text type="secondary">Đối tượng:</Text>
                    <Text strong>
                      {appointmentData.bookingFor === "family"
                        ? "Người thân"
                        : "Bản thân"}
                    </Text>
                  </div>
                  {appointmentData.firstDoseDate && (
                    <div className="flex justify-between">
                      <Text type="secondary">Ngày bắt đầu:</Text>
                      <Text strong>
                        {dayjs(appointmentData.firstDoseDate).format(
                          "DD/MM/YYYY"
                        )}
                      </Text>
                    </div>
                  )}
                  {appointmentData.firstDoseTime && (
                    <div className="flex justify-between">
                      <Text type="secondary">Giờ bắt đầu:</Text>
                      <Text strong>{appointmentData.firstDoseTime}</Text>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <Text type="secondary">Đã đặt lịch:</Text>
                    <Text
                      strong
                      className={
                        doseSchedules.length ===
                        bookingData.vaccine.dosesRequired
                          ? "text-green-600"
                          : "text-orange-600"
                      }
                    >
                      {doseSchedules.length}/{bookingData.vaccine.dosesRequired}{" "}
                      mũi
                    </Text>
                  </div>
                  <div className="flex justify-between">
                    <Text type="secondary">Trạng thái lịch:</Text>
                    <Tag
                      color={
                        doseSchedules.length ===
                        bookingData.vaccine.dosesRequired
                          ? "green"
                          : "orange"
                      }
                    >
                      {doseSchedules.length ===
                      bookingData.vaccine.dosesRequired
                        ? "Đã đủ"
                        : "Chưa đủ"}
                    </Tag>
                  </div>
                </div>
              </Card>
            </Col>

            {/* Payment Info */}
            <Col xs={24} lg={8}>
              <Card
                size="small"
                title="💳 Thông tin thanh toán"
                className="h-full"
              >
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Text type="secondary">Phương thức:</Text>
                    <Text strong>{selectedPayment}</Text>
                  </div>
                  <div className="flex justify-between">
                    <Text type="secondary">Trạng thái:</Text>
                    <Tag color={currentStep >= 2 ? "green" : "orange"}>
                      {currentStep >= 2 ? "Đã xem lại" : "Chưa hoàn thành"}
                    </Tag>
                  </div>
                  <div className="flex justify-between">
                    <Text type="secondary">Step hiện tại:</Text>
                    <Text strong>
                      {currentStep === 0
                        ? "Đặt lịch"
                        : currentStep === 1
                        ? "Thanh toán"
                        : "Xem lại"}
                    </Text>
                  </div>
                  <div className="flex justify-between">
                    <Text type="secondary">Tiến độ:</Text>
                    <Text strong>
                      {Math.round(((currentStep + 1) / 3) * 100)}%
                    </Text>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>

          {/* Progress indicator */}
          <Divider />
          <div className="text-center">
            <Text type="secondary" className="text-sm">
              Tiến độ hoàn thành: {Math.round(((currentStep + 1) / 3) * 100)}%
            </Text>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / 3) * 100}%` }}
              ></div>
            </div>
          </div>
        </Card>

        {/* Dose Schedule Detail */}
        <DoseScheduleDetail doseSchedules={doseSchedules} />
      </div>
    );
  };

  // Component debug hiển thị raw data (chỉ hiển thị trong development)
  // const DebugDataView = () => {
  //   const appointmentData = bookingForm.getFieldsValue();
  //   const paymentData = paymentForm.getFieldsValue();

  //   if (process.env.NODE_ENV !== "development") return null;

  //   return (
  //     <Card
  //       size="small"
  //       className="mb-4 bg-gray-50"
  //       title="🔧 Debug Data (Development Only)"
  //     >
  //       <Row gutter={16}>
  //         <Col span={8}>
  //           <Text strong className="block mb-2">
  //             Booking Data State:
  //           </Text>
  //           <pre className="text-xs bg-white p-2 rounded border overflow-auto max-h-40">
  //             {JSON.stringify(bookingData, null, 2)}
  //           </pre>
  //         </Col>
  //         <Col span={8}>
  //           <Text strong className="block mb-2">
  //             Appointment Form Data:
  //           </Text>
  //           <pre className="text-xs bg-white p-2 rounded border overflow-auto max-h-40">
  //             {JSON.stringify(appointmentData, null, 2)}
  //           </pre>
  //         </Col>
  //         <Col span={8}>
  //           <Text strong className="block mb-2">
  //             Payment Form Data:
  //           </Text>
  //           <pre className="text-xs bg-white p-2 rounded border overflow-auto max-h-40">
  //             {JSON.stringify({ ...paymentData, selectedPayment }, null, 2)}
  //           </pre>
  //         </Col>
  //       </Row>
  //     </Card>
  //   );
  // };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <TopChekoutSection
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />

        {/* Debug view trong development */}
        {/* <DebugDataView /> */}

        {/* Hiển thị tổng hợp data từ tất cả steps */}
        <BookingDataSummary />

        {currentStep === 0 && (
          <AppointmentSection
            bookingForm={bookingForm}
            vaccine={bookingData.vaccine as IVaccine}
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
            vaccine={bookingData.vaccine as IVaccine}
            bookingData={bookingData}
            finalTotal={bookingData.finalTotal}
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
