/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import {
  Card,
  Form,
  DatePicker,
  Select,
  Row,
  Col,
  Typography,
  Alert,
  Divider,
  Radio,
  Button,
} from "antd";
import type { FormInstance } from "antd";
import {
  CalendarOutlined,
  UserOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import locale from "antd/es/date-picker/locale/vi_VN";
import dayjs, { Dayjs } from "dayjs";
import { IVaccine, BuildQueryParams, IDoseSchedule } from "@/types/backend";
import { useCenter } from "@/hooks/useCenter";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "@/constants";
import { useFamilyMember } from "@/hooks/useFamilyMember";

const { Text } = Typography;



interface AppointmentProps {
  vaccine: IVaccine;
  bookingForm: FormInstance;
  setCurrentStep: (currentStep: number) => void;
}

const AppointmentSection = ({
  bookingForm,
  vaccine,
  setCurrentStep,
}: AppointmentProps) => {
  const [doseForms, setDoseForms] = useState<IDoseSchedule[]>([]);
  const [firstDoseDate, setFirstDoseDate] = useState<Dayjs | null>(null);
  const [firstDoseTime, setFirstDoseTime] = useState<string>("08:00");
  const [firstDoseCenterId, setFirstDoseCenterId] = useState<string>("");
  const [bookingFor, setBookingFor] = useState<"self" | "family">("self");

  const filter: BuildQueryParams = {
    current: DEFAULT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
  };

  const { data: centers } = useCenter(filter);
  const { data: families } = useFamilyMember(filter);

  const disabledWeekendDate = (current: Dayjs | null) => {
    return current ? current.day() === 0 || current.day() === 6 : false;
  };

  const timeSlots = ["08:00", "09:00", "10:00", "14:00", "15:00", "16:00"];

  useEffect(() => {
    const formValues = bookingForm.getFieldsValue();
    console.log("📋 Booking Form Values:", formValues);
    console.log("🗓️  First Dose Date:", firstDoseDate?.format("DD/MM/YYYY"));
    console.log("⏰ First Dose Time:", firstDoseTime);
    console.log("💉 Dose Forms:", doseForms);
    console.log("💉 Dose Forms Length:", doseForms.length);
    console.log("🏥 Vaccine Info:", {
      name: vaccine?.name,
      dosesRequired: vaccine?.dosesRequired,
      duration: vaccine?.duration,
    });
  }, [bookingForm, firstDoseDate, firstDoseTime, doseForms, vaccine]);

  useEffect(() => {
    console.log(
      "🔄 useEffect triggered - firstDoseDate:",
      firstDoseDate?.format("DD/MM/YYYY")
    );
    console.log("🔄 useEffect triggered - firstDoseTime:", firstDoseTime);
    console.log("🔄 useEffect triggered - vaccine:", vaccine?.name);

    if (!firstDoseDate || !vaccine) {
      console.log("⚠️ Missing requirements - firstDoseDate or vaccine");
      return;
    }

    const { dosesRequired, duration } = vaccine;
    const dates: Dayjs[] = [firstDoseDate];

    // Calculate all subsequent dose dates
    for (let i = 1; i < dosesRequired; i++) {
      const previousDate = dates[i - 1];
      if (!previousDate) continue;

      let nextDate = previousDate.add(duration, "day");

      while (nextDate.day() === 0 || nextDate.day() === 6) {
        nextDate = nextDate.add(1, "day");
      }

      dates.push(nextDate);
    }

    // Create dose forms for ALL doses (including first dose)
    const forms: IDoseSchedule[] = [];
    for (let i = 0; i < dosesRequired; i++) {
      const date = dates[i];
      if (date) {
        forms.push({
          doseNumber: i + 1,
          date: date,
          time: i === 0 ? firstDoseTime : timeSlots[0] || "08:00",
          centerId: i === 0 ? firstDoseCenterId : firstDoseCenterId, // Mặc định dùng center của mũi đầu
        });
      }
    }

    console.log("✅ Created dose forms:", forms);
    console.log("✅ Dose forms length:", forms.length);

    setDoseForms(forms);

    // Set form values for all dose schedules
    const doseSchedulesValues = forms.map((form) => ({
      date: form.date,
      time: form.time,
      centerId: form.centerId,
    }));
    bookingForm.setFieldsValue({
      doseSchedules: doseSchedulesValues,
    });

    console.log("✅ Form values set:", doseSchedulesValues);
  }, [firstDoseDate, firstDoseTime, firstDoseCenterId, vaccine]);

  const handleDoseDateChange = (index: number, value: Dayjs | null) => {
    if (!value) return;
    const updatedForms = [...doseForms];
    const targetForm = updatedForms[index];
    if (targetForm) {
      targetForm.date = value;
      setDoseForms(updatedForms);

      const currentSchedules = bookingForm.getFieldValue("doseSchedules") || [];
      currentSchedules[index] = {
        ...currentSchedules[index],
        date: value,
        centerId: targetForm.centerId,
      };
      bookingForm.setFieldsValue({
        doseSchedules: currentSchedules,
      });

      console.log(
        `📅 Dose ${index + 1} date changed:`,
        value.format("DD/MM/YYYY")
      );
      console.log("Updated schedules:", currentSchedules);

      if (index === 0) {
        setFirstDoseDate(value);
      }
    }
  };

  const handleDoseTimeChange = (index: number, value: string) => {
    const updatedForms = [...doseForms];
    const targetForm = updatedForms[index];
    if (targetForm) {
      targetForm.time = value;
      setDoseForms(updatedForms);

      const currentSchedules = bookingForm.getFieldValue("doseSchedules") || [];
      currentSchedules[index] = {
        ...currentSchedules[index],
        time: value,
        centerId: targetForm.centerId,
      };
      bookingForm.setFieldsValue({
        doseSchedules: currentSchedules,
      });

      console.log(`⏰ Dose ${index + 1} time changed:`, value);
      console.log("Updated schedules:", currentSchedules);

      // Update firstDoseTime if changing the first dose time
      if (index === 0) {
        setFirstDoseTime(value);
      }
    }
  };

  const handleFirstDoseDateChange = (date: Dayjs | null) => {
    setFirstDoseDate(date);
    console.log(
      "📆 First dose date selected:",
      date?.format("DD/MM/YYYY HH:mm")
    );
  };

  const handleFirstDoseCenterChange = (centerId: string) => {
    setFirstDoseCenterId(centerId);
    console.log("🏥 First dose center selected:", centerId);
  };

  const handleDoseCenterChange = (index: number, centerId: string) => {
    const updatedForms = [...doseForms];
    const targetForm = updatedForms[index];
    if (targetForm) {
      targetForm.centerId = centerId;
      setDoseForms(updatedForms);

      const currentSchedules = bookingForm.getFieldValue("doseSchedules") || [];
      currentSchedules[index] = {
        ...currentSchedules[index],
        centerId: centerId,
      };
      bookingForm.setFieldsValue({
        doseSchedules: currentSchedules,
      });

      console.log(`🏥 Dose ${index + 1} center changed:`, centerId);
      console.log("Updated schedules:", currentSchedules);
    }
  };

  const disabledDate = (current: Dayjs | null): boolean => {
    if (!current) return false;
    const isPast = current < dayjs().startOf("day");
    const isWeekend = current.day() === 0 || current.day() === 6;
    return isPast || isWeekend;
  };

  const handleBookingNext = async () => {
    try {
      await bookingForm.validateFields();
      setCurrentStep(1);
    } catch (error) {
      console.log("Validation failed:", error);
    }
  };

  return (
    <Card title="Thông tin lịch hẹn" className="!mb-8 !shadow-md">
      <Form form={bookingForm} layout="vertical">
        <Row gutter={24}>
          <Col xs={24} lg={12}>
            {vaccine && (
              <div className="!mb-6">
                <Card
                  size="small"
                  className="!bg-gradient-to-r !from-blue-50 !to-blue-100 !border-blue-300 !shadow-sm"
                >
                  <div className="!space-y-3">
                    <div className="!flex !items-center !gap-2">
                      <div className="!w-2 !h-8 !bg-blue-500 !rounded"></div>
                      <Text strong className="!text-xl !text-blue-800">
                        {vaccine.name}
                      </Text>
                    </div>
                    <div className="!pl-4">
                      <Row gutter={16}>
                        <Col span={12}>
                          <div className="!bg-white !p-3 !rounded-lg">
                            <Text type="secondary" className="!text-xs">
                              Tổng số mũi
                            </Text>
                            <div className="!flex !items-baseline !gap-1 !mt-1">
                              <Text strong className="!text-2xl !text-blue-600">
                                {vaccine.dosesRequired}
                              </Text>
                              <Text type="secondary" className="!text-sm">
                                mũi
                              </Text>
                            </div>
                          </div>
                        </Col>
                        <Col span={12}>
                          <div className="!bg-white !p-3 !rounded-lg">
                            <Text type="secondary" className="!text-xs">
                              Khoảng cách
                            </Text>
                            <div className="!flex !items-baseline !gap-1 !mt-1">
                              <Text strong className="!text-2xl !text-blue-600">
                                {vaccine.duration}
                              </Text>
                              <Text type="secondary" className="!text-sm">
                                ngày
                              </Text>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {!firstDoseDate && (
              <Alert
                message="Hướng dẫn đặt lịch"
                description={
                  <div className="!space-y-2">
                    <p>Vui lòng chọn ngày bắt đầu cho mũi tiêm đầu tiên.</p>
                    <p className="!text-sm">
                      Hệ thống sẽ tự động tính toán lịch cho tất cả{" "}
                      <strong className="!text-blue-600">
                        {vaccine?.dosesRequired} mũi tiêm
                      </strong>{" "}
                      dựa trên khoảng cách{" "}
                      <strong className="!text-blue-600">
                        {vaccine?.duration} ngày
                      </strong>
                      .
                    </p>
                  </div>
                }
                type="info"
                className="!mb-6 !border-l-4 !border-l-blue-500"
                showIcon={false}
              />
            )}

            <div className="!bg-gray-50 !p-5 !rounded-lg !mb-6 !border !border-gray-200">
              <div className="!mb-4">
                <div className="!flex !items-center !gap-2 !mb-3">
                  <div className="!w-1 !h-6 !bg-blue-500 !rounded"></div>
                  <Text strong className="!text-base !text-gray-700">
                    Thông tin mũi tiêm đầu tiên
                  </Text>
                </div>
              </div>

              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label={
                      <span className="!font-semibold !text-sm">Chọn ngày</span>
                    }
                    name="firstDoseDate"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn ngày",
                      },
                    ]}
                  >
                    <DatePicker
                      className="w-full"
                      locale={locale}
                      disabledDate={disabledDate}
                      onChange={handleFirstDoseDateChange}
                      suffixIcon={<CalendarOutlined />}
                      placeholder="Chọn ngày bắt đầu"
                      size="large"
                      format="DD/MM/YYYY"
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12}>
                  <Form.Item
                    label={
                      <span className="!font-semibold !text-sm">Chọn giờ</span>
                    }
                    name="firstDoseTime"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn giờ",
                      },
                    ]}
                    initialValue={firstDoseTime}
                  >
                    <Select
                      options={timeSlots.map((time) => ({
                        value: time,
                        label: time,
                      }))}
                      onChange={(value) => setFirstDoseTime(value)}
                      size="large"
                      placeholder="Chọn giờ tiêm"
                    />
                  </Form.Item>
                </Col>
              </Row>

              {/* Chọn địa điểm tiêm cho mũi đầu tiên */}
              <Row gutter={16} className="mt-4">
                <Col xs={24}>
                  <Form.Item
                    label={
                      <span className="!font-semibold !text-sm">
                        Chọn địa điểm tiêm
                      </span>
                    }
                    name="firstDoseCenter"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn địa điểm tiêm",
                      },
                    ]}
                    initialValue={firstDoseCenterId}
                  >
                    <Select
                      options={centers?.result?.map((center) => ({
                        value: center.centerId,
                        label: (
                          <div>
                            <div className="!font-medium">{center.name}</div>
                          </div>
                        ),
                      }))}
                      onChange={handleFirstDoseCenterChange}
                      size="large"
                      placeholder="Chọn trung tâm tiêm chủng"
                      showSearch
                      filterOption={(input, option) => {
                        const center = centers?.result?.find(
                          (c) => c.centerId === option?.value
                        );
                        return (
                          center?.name
                            ?.toLowerCase()
                            ?.includes(input.toLowerCase()) || false
                        );
                      }}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </div>

            {doseForms.length > 0 ? (
              <div className="!mt-6">
                <Divider orientation="left" className="!border-blue-300">
                  <span className="!text-lg !font-semibold !text-blue-700 !flex !items-center !gap-2">
                    Lịch tiêm chi tiết
                    <span className="!text-sm !bg-blue-100 !text-blue-700 !px-3 !py-1 !rounded-full">
                      {doseForms.length} mũi
                    </span>
                  </span>
                </Divider>

                <Form.List name="doseSchedules">
                  {(fields) => (
                    <>
                      {fields.map(({ key, name, ...restField }, index) => {
                        const doseForm = doseForms[index];
                        if (!doseForm) return null;

                        const isFirstDose = index === 0;

                        return (
                          <Card
                            key={key}
                            size="small"
                            title={
                              <div className="!flex !items-center !gap-2">
                                <div
                                  className={`!w-8 !h-8 !rounded-full !flex !items-center !justify-center ${
                                    isFirstDose
                                      ? "!bg-blue-500 !text-white"
                                      : "!bg-gray-200 !text-gray-700"
                                  }`}
                                >
                                  {doseForm.doseNumber}
                                </div>
                                <span>
                                  Mũi tiêm thứ {doseForm.doseNumber}
                                  {isFirstDose && (
                                    <span className="!ml-2 !text-xs !bg-blue-100 !text-blue-700 !px-2 !py-1 !rounded">
                                      Mũi đầu tiên
                                    </span>
                                  )}
                                </span>
                              </div>
                            }
                            className={`!mb-4 !transition-all hover:!shadow-lg ${
                              isFirstDose
                                ? "!border-2 !border-blue-300"
                                : "!border !border-gray-200"
                            }`}
                            styles={{
                              header: isFirstDose
                                ? {
                                    backgroundColor: "#e6f4ff",
                                    fontWeight: "bold",
                                    borderBottom: "2px solid #1890ff",
                                  }
                                : { backgroundColor: "#fafafa" },
                            }}
                          >
                            <Row gutter={16}>
                              <Col xs={24} sm={12}>
                                <Form.Item
                                  {...restField}
                                  label={
                                    <span className="!font-medium">
                                      Ngày tiêm
                                    </span>
                                  }
                                  name={[name, "date"]}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Vui lòng chọn ngày",
                                    },
                                  ]}
                                >
                                  <DatePicker
                                    className="w-full"
                                    locale={locale}
                                    disabledDate={disabledWeekendDate}
                                    value={doseForm.date}
                                    onChange={(value) =>
                                      handleDoseDateChange(index, value)
                                    }
                                    format="DD/MM/YYYY"
                                    size="large"
                                  />
                                </Form.Item>
                              </Col>
                              <Col xs={24} sm={12}>
                                <Form.Item
                                  {...restField}
                                  label={
                                    <span className="!font-medium">
                                      Giờ tiêm
                                    </span>
                                  }
                                  name={[name, "time"]}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Vui lòng chọn giờ",
                                    },
                                  ]}
                                >
                                  <Select
                                    options={timeSlots.map((time) => ({
                                      value: time,
                                      label: time,
                                    }))}
                                    value={doseForm.time}
                                    onChange={(value) =>
                                      handleDoseTimeChange(index, value)
                                    }
                                    size="large"
                                    placeholder="Chọn giờ"
                                  />
                                </Form.Item>
                              </Col>
                            </Row>

                            {/* Chọn địa điểm tiêm cho mũi này */}
                            <Row gutter={16} className="!mt-4">
                              <Col xs={24}>
                                <Form.Item
                                  {...restField}
                                  label={
                                    <span className="!font-medium">
                                      Địa điểm tiêm
                                      {isFirstDose && (
                                        <span className="!ml-2 !text-xs !text-gray-500">
                                          (mặc định từ mũi đầu tiên)
                                        </span>
                                      )}
                                    </span>
                                  }
                                  name={[name, "centerId"]}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Vui lòng chọn địa điểm tiêm",
                                    },
                                  ]}
                                  initialValue={doseForm.centerId}
                                >
                                  <Select
                                    options={centers?.result?.map((center) => ({
                                      value: center.centerId,
                                      label: (
                                        <div>
                                          <div className="!font-medium">
                                            {center.name}
                                          </div>
                                        </div>
                                      ),
                                    }))}
                                    value={doseForm.centerId}
                                    onChange={(value) =>
                                      handleDoseCenterChange(index, value)
                                    }
                                    size="large"
                                    placeholder={
                                      isFirstDose
                                        ? "Địa điểm được chọn ở trên"
                                        : "Chọn địa điểm tiêm (mặc định: như mũi đầu)"
                                    }
                                    showSearch
                                    filterOption={(input, option) => {
                                      const center = centers?.result?.find(
                                        (c) => c.centerId === option?.value
                                      );
                                      return (
                                        center?.name
                                          ?.toLowerCase()
                                          ?.includes(input.toLowerCase()) ||
                                        false
                                      );
                                    }}
                                  />
                                </Form.Item>
                              </Col>
                            </Row>
                          </Card>
                        );
                      })}
                    </>
                  )}
                </Form.List>
              </div>
            ) : (
              <div className="!mt-6">
                <Alert
                  message="Chưa có lịch tiêm"
                  description="Vui lòng chọn ngày và giờ cho mũi tiêm đầu tiên để hệ thống tạo lịch tiêm chi tiết."
                  type="warning"
                  showIcon={false}
                />
              </div>
            )}
          </Col>
          <Col xs={24} lg={12}>
            {/* Chọn đối tượng tiêm chủng */}
            <div className="!mb-6">
              <Card
                size="small"
                className="!bg-gradient-to-r !from-green-50 !to-green-100 !border-green-300 !shadow-sm"
              >
                <div className="!space-y-3">
                  <div className="!flex !items-center !gap-2">
                    <div className="!w-2 !h-8 !bg-green-500 !rounded"></div>
                    <Text strong className="!text-xl !text-green-800">
                      Đối tượng tiêm chủng
                    </Text>
                  </div>
                </div>
              </Card>
            </div>

            <div className="!bg-gray-50 !p-5 !rounded-lg !mb-6 !border !border-gray-200">
              <Form.Item
                label={
                  <span className="!font-semibold !text-base">
                    Đăng ký lịch cho
                  </span>
                }
                name="bookingFor"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn đối tượng tiêm chủng",
                  },
                ]}
                initialValue="self"
              >
                <Radio.Group
                  onChange={(e) => setBookingFor(e.target.value)}
                  className="w-full"
                  size="large"
                >
                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      <Radio.Button
                        value="self"
                        className="!w-full !h-auto !py-4 !text-center"
                      >
                        <div className="!flex !flex-col !items-center !gap-2">
                          <UserOutlined className="!text-2xl !text-blue-500" />
                          <span className="!font-medium">Bản thân</span>
                        </div>
                      </Radio.Button>
                    </Col>
                    <Col span={12}>
                      <Radio.Button
                        value="family"
                        className="!w-full !h-auto !py-4 !text-center"
                      >
                        <div className="!flex !flex-col !items-center !gap-2">
                          <TeamOutlined className="!text-2xl !text-green-500" />
                          <span className="!font-medium">Người thân</span>
                        </div>
                      </Radio.Button>
                    </Col>
                  </Row>
                </Radio.Group>
              </Form.Item>

              {bookingFor === "family" && (
                <Form.Item
                  label={
                    <span className="!font-semibold !text-sm">
                      Chọn người thân
                    </span>
                  }
                  name="familyMemberId"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn người thân",
                    },
                  ]}
                  className="!mt-4"
                >
                  <Select
                    placeholder="Chọn người thân cần tiêm chủng"
                    size="large"
                    options={families?.result?.map((member) => ({
                      value: member.id,
                      label: (
                        <div>
                          <div className="!font-medium">{member.fullName}</div>
                        </div>
                      ),
                    }))}
                    showSearch
                  />
                </Form.Item>
              )}

              <Alert
                message={
                  bookingFor === "self" ? (
                    <span className="!text-sm">
                      Bạn đang đăng ký lịch tiêm cho <strong>bản thân</strong>
                    </span>
                  ) : (
                    <span className="!text-sm">
                      Bạn đang đăng ký lịch tiêm cho <strong>người thân</strong>
                    </span>
                  )
                }
                type={bookingFor === "self" ? "info" : "success"}
                className="!mt-4 !border-l-4 !border-l-blue-500"
                showIcon={false}
              />
            </div>

            {/* Thông tin bổ sung */}
            <div className="!bg-blue-50 !p-4 !rounded-lg !border !border-blue-200">
              <div className="!flex !items-start !gap-3">
                <div className="!flex-1">
                  <Text strong className="!text-blue-800 !block !mb-2">
                    Lưu ý quan trọng
                  </Text>
                  <ul className="!text-sm !text-gray-700 !space-y-1">
                    <li>• Vui lòng mang theo CMND/CCCD khi đến tiêm</li>
                    <li>
                      • Đối với trẻ em: Mang theo giấy khai sinh hoặc sổ tiêm
                      chủng
                    </li>
                    <li>• Đến trước giờ hẹn 15 phút để làm thủ tục</li>
                    <li>
                      • Liên hệ hotline nếu cần thay đổi hoặc hủy lịch hẹn
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Form>
      <div className="flex justify-end mt-8">
        <Button
          type="primary"
          onClick={handleBookingNext}
          className="px-8 rounded-lg"
        >
          Continue to payment
        </Button>
      </div>
    </Card>
  );
};

export default AppointmentSection;
