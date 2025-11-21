import { CheckCircleOutlined } from "@ant-design/icons";
import {
  Card,
  Button,
  Typography,
  Checkbox,
  Image,
  FormInstance,
  Divider,
} from "antd";
import { formatPrice } from "@/utils/formatPrice";
import { paymentMethods } from "@/components/payment";
import {
  IVaccine,
  BuildQueryParams,
  IDoseSchedule,
} from "@/types/backend";
import { useCenter } from "@/hooks/useCenter";
import { useFamilyMember } from "@/hooks/useFamilyMember";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "@/constants";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import weekday from "dayjs/plugin/weekday";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(weekday);
dayjs.extend(localizedFormat);
dayjs.locale("vi");

const { Title, Text } = Typography;

interface ReviewDoseSchedule {
  doseNumber?: number;
  date: dayjs.Dayjs | string; // Could be dayjs object or ISO string
  time: string;
  centerId: string | number;
}

// Centralized booking data interface (matching parent component)
interface BookingData {
  vaccine: IVaccine | null;
  appointmentData: {
    bookingFor: "self" | "family";
    familyMemberId?: number;
    firstDoseDate?: IDoseSchedule;
    firstDoseTime?: string;
    firstDoseCenter?: string;
    doseSchedules: IDoseSchedule[];
  };
  paymentData: {
    selectedPayment: string;
    cardNumber?: string;
    expiryDate?: string;
    cvv?: string;
    holderName?: string;
  };
  finalTotal: number;
  isCompleted: boolean;
}

interface ReviewProps {
  loading: boolean;
  finalTotal: number;
  selectedPayment: string;
  paymentForm: FormInstance;
  bookingForm: FormInstance;
  vaccine: IVaccine;
  bookingData: BookingData; // Add centralized data
  setCurrentStep: (currentStep: number) => void;
  handlePlaceBooking: () => void;
}

const ReviewSection = ({
  loading,
  finalTotal,
  vaccine,
  bookingData,
  setCurrentStep,
  handlePlaceBooking,
}: ReviewProps) => {
  const filter: BuildQueryParams = {
    current: DEFAULT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
  };
  const { data: centers } = useCenter(filter);
  const { data: families } = useFamilyMember(filter);

  const appointmentData = bookingData.appointmentData;
  const paymentData = bookingData.paymentData;
  const doseSchedules = appointmentData.doseSchedules || [];
  const vaccineInfo = bookingData.vaccine || vaccine;

  // Debug logging for centralized booking data
  console.log("📋 Review - BookingData:", bookingData);
  console.log("📋 Review - Appointment data:", appointmentData);
  console.log("📋 Review - Payment data:", paymentData);
  console.log("📋 Review - Dose schedules:", doseSchedules);
  console.log("📋 Review - Final total:", bookingData.finalTotal);
  console.log("📋 Review - Is completed:", bookingData.isCompleted);

  // Helper function to get center info by ID
  const getCenterById = (centerId: string) => {
    return centers?.result?.find((center) => center.centerId === centerId);
  };

  // Helper function to get family member info by ID
  const getFamilyMemberById = (memberId: number) => {
    return families?.result?.find((member) => member.id === memberId);
  };

  return (
    <Card className="!rounded-xl !shadow-sm !border-0">
      <div className="!flex !items-center !gap-3 !mb-6">
        <div className="!w-10 !h-10 !bg-purple-100 !rounded-full !flex !items-center !justify-center">
          <CheckCircleOutlined className="!text-purple-600" />
        </div>
        <Title level={3} className="!mb-0">
          Xem lại thông tin đặt lịch
        </Title>
      </div>

      {/* Vaccine Information */}
      <div className="!mb-8">
        <Title level={4} className="!mb-4">
          🔬 Thông tin vaccine
        </Title>
        <Card className="!border-blue-200 !bg-blue-50">
          <div className="!flex !flex-col md:!flex-row !items-start !gap-4">
            <div className="!flex-shrink-0">
              <Image
                src={vaccineInfo?.image}
                alt={vaccineInfo?.name}
                className="!w-20 !h-20 !object-cover !rounded-xl !border-2 !border-blue-300"
                fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3Ik1xnG4W+Q2yCQYRqEAjQBJ9BW2XjeAhMBAh4iI3P/k="
              />
            </div>

            <div className="!flex-1">
              <Text strong className="!block !text-xl !text-blue-800 !mb-2">
                {vaccineInfo?.name}
                <span className="!ml-2 !text-sm !bg-green-100 !text-green-700 !px-2 !py-1 !rounded">
                  📊 BookingData
                </span>
              </Text>

              <div className="!grid !grid-cols-1 md:!grid-cols-2 !gap-4">
                <div className="!bg-white !p-3 !rounded-lg !border">
                  <Text className="!text-xs !text-gray-500 !block">
                    🌍 Xuất xứ
                  </Text>
                  <Text strong className="!text-sm">
                    {vaccineInfo?.country}
                  </Text>
                </div>

                <div className="!bg-white !p-3 !rounded-lg !border">
                  <Text className="!text-xs !text-gray-500 !block">
                    💉 Số mũi tiêm
                  </Text>
                  <Text strong className="!text-sm">
                    {vaccineInfo?.dosesRequired} mũi
                  </Text>
                </div>

                <div className="!bg-white !p-3 !rounded-lg !border">
                  <Text className="!text-xs !text-gray-500 !block">
                    📅 Khoảng cách
                  </Text>
                  <Text strong className="!text-sm">
                    {vaccineInfo?.duration} ngày
                  </Text>
                </div>

                <div className="!bg-white !p-3 !rounded-lg !border">
                  <Text className="!text-xs !text-gray-500 !block">
                    💰 Giá mỗi mũi
                  </Text>
                  <Text strong className="!text-sm !text-green-600">
                    {formatPrice(vaccineInfo?.price || 0)}
                  </Text>
                </div>
              </div>

              {vaccineInfo?.description && (
                <div className="!mt-3 !bg-white !p-3 !rounded-lg !border">
                  <Text className="!text-xs !text-gray-500 !block">
                    📝 Mô tả
                  </Text>
                  <Text className="!text-sm !text-gray-700">
                    {vaccineInfo.description}
                  </Text>
                </div>
              )}
            </div>

            <div className="!flex-shrink-0 !text-right">
              <div className="!bg-white !p-4 !rounded-lg !border !text-center">
                <Text className="!text-sm !text-gray-500 !block !mb-1">
                  Tổng chi phí
                </Text>
                <Text strong className="!text-2xl !text-blue-600 !block">
                  {formatPrice(bookingData.finalTotal)}
                </Text>
                <Text className="!text-xs !text-gray-500">
                  {formatPrice(vaccineInfo?.price || 0)} x{" "}
                  {vaccineInfo?.dosesRequired} mũi
                </Text>
                <div className="!mt-2 !pt-2 !border-t">
                  <Text className="!text-xs !text-green-600">
                    💰 Từ BookingData State
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Appointment Schedule */}
      <div className="!mb-8">
        <Title level={4} className="!mb-4">
          📅 Lịch tiêm chi tiết ({doseSchedules.length} mũi)
        </Title>

        {doseSchedules.length > 0 && (
          <div className="!mb-4 !p-3 !bg-blue-100 !border !border-blue-300 !rounded-lg">
            <Text className="!text-sm !text-blue-700">
              <strong>Ngày bắt đầu:</strong>{" "}
              {appointmentData.firstDoseDate
                ? dayjs(appointmentData.firstDoseDate.date).format("DD/MM/YYYY")
                : doseSchedules[0]?.date
                ? dayjs(doseSchedules[0].date).format("DD/MM/YYYY")
                : "Chưa xác định"}{" "}
              |<strong> Giờ:</strong>{" "}
              {appointmentData.firstDoseTime ||
                doseSchedules[0]?.time ||
                "Chưa xác định"}{" "}
              |<strong> Trung tâm:</strong>{" "}
              {getCenterById(String(doseSchedules[0]?.centerId || ""))?.name ||
                `ID: ${doseSchedules[0]?.centerId}`}
            </Text>
          </div>
        )}
        <div className="!space-y-4">
          {doseSchedules.map((schedule: ReviewDoseSchedule, index: number) => {
            // Handle both dayjs object and ISO string formats
            let scheduleDate = schedule.date;
            if (typeof scheduleDate === "string") {
              scheduleDate = dayjs(scheduleDate);
            }

            const center = getCenterById(String(schedule.centerId) || "");
            const isFirstDose = index === 0;

            console.log(`📋 Review - Dose ${index + 1}:`, {
              date: scheduleDate?.format
                ? scheduleDate.format("DD/MM/YYYY")
                : "Invalid date",
              time: schedule.time,
              centerId: schedule.centerId,
              centerName: center?.name,
            });

            return (
              <Card
                key={index}
                size="small"
                className={`!transition-all !border !border-solid ${
                  isFirstDose
                    ? "!border-blue-300 !bg-blue-50"
                    : "!border-green-300 !bg-green-50"
                }`}
              >
                <div className="!flex !justify-between !items-start">
                  <div className="!flex-1">
                    <div className="!flex !items-center !gap-3 !mb-3">
                      <div
                        className={`!w-10 !h-10 !rounded-full !flex !items-center !justify-center !text-white !font-bold !text-lg ${
                          isFirstDose ? "!bg-blue-500" : "!bg-green-500"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <div>
                        <Text strong className="!text-lg">
                          Mũi tiêm thứ {index + 1}
                        </Text>
                        {isFirstDose && (
                          <span className="!ml-2 !text-xs !bg-blue-100 !text-blue-700 !px-2 !py-1 !rounded">
                            Mũi đầu tiên
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="!grid !grid-cols-1 md:!grid-cols-2 !gap-4 !bg-white !p-4 !rounded-lg !border">
                      <div>
                        <Text className="!text-sm !text-gray-500 !block !mb-1">
                          📅 Ngày tiêm:
                        </Text>
                        <Text strong className="!text-base !text-gray-800">
                          {scheduleDate && scheduleDate.format
                            ? scheduleDate.format("dddd, DD/MM/YYYY")
                            : "Chưa chọn ngày"}
                        </Text>
                      </div>

                      <div>
                        <Text className="!text-sm !text-gray-500 !block !mb-1">
                          ⏰ Giờ tiêm:
                        </Text>
                        <Text strong className="!text-base !text-gray-800">
                          {schedule.time || "Chưa chọn giờ"}
                        </Text>
                      </div>

                      <div className="md:!col-span-2 !mt-3 !pt-3 !border-t !border-gray-200">
                        <Text className="!text-sm !text-gray-500 !block !mb-1">
                          🏥 Trung tâm tiêm:
                        </Text>
                        <Text
                          strong
                          className="!text-base !text-gray-800 !block"
                        >
                          {center?.name || `Trung tâm ID: ${schedule.centerId}`}
                        </Text>
                        {center && center.address && (
                          <Text className="!text-sm !text-gray-600 !mt-1">
                            📍 {center.address}
                          </Text>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="!text-right !ml-4">
                    <div className="!bg-white !p-3 !rounded-lg !border !text-center">
                      <Text className="!text-xs !text-gray-500 !block !mb-1">
                        Giá mũi tiêm
                      </Text>
                      <Text strong className="!text-lg !text-blue-600">
                        {formatPrice(vaccineInfo?.price || 0)}
                      </Text>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Booking Information */}
      <div className="!mb-8">
        <Title level={4} className="!mb-4">
          Thông tin đặt lịch
        </Title>
        <Card className="!border-orange-200 !bg-orange-50">
          <div className="!grid !grid-cols-1 md:!grid-cols-2 !gap-6">
            {/* Đối tượng tiêm chủng */}
            <div>
              <Text className="!text-sm !text-gray-500 !block !mb-2">
                👤 Đối tượng tiêm chủng:
              </Text>
              <div className="!bg-white !p-3 !rounded-lg !border">
                <Text strong className="!block !text-base">
                  {appointmentData.bookingFor === "family"
                    ? "Thành viên gia đình"
                    : "Bản thân"}
                </Text>
                {appointmentData.bookingFor === "family" &&
                  appointmentData.familyMemberId && (
                    <div className="!mt-2">
                      <Text className="!text-sm !text-gray-600">Tên:</Text>
                      <Text strong className="!ml-2 !text-sm">
                        {getFamilyMemberById(appointmentData.familyMemberId)
                          ?.fullName || "Đang tải..."}
                      </Text>
                    </div>
                  )}
              </div>
            </div>

            {/* Phương thức thanh toán */}
            <div>
              <Text className="!text-sm !text-gray-500 !block !mb-2">
                💳 Phương thức thanh toán:
              </Text>
              <div className="!bg-white !p-3 !rounded-lg !border">
                <div className="!flex !items-center !gap-2">
                  {
                    paymentMethods.find(
                      (m) => m.id === paymentData.selectedPayment
                    )?.icon
                  }
                  <Text strong>
                    {
                      paymentMethods.find(
                        (m) => m.id === paymentData.selectedPayment
                      )?.name
                    }
                  </Text>
                  <span className="!ml-2 !text-xs !bg-green-100 !text-green-700 !px-2 !py-1 !rounded">
                    📊 BookingData
                  </span>
                </div>
                {paymentData.selectedPayment === "card" &&
                  paymentData.cardNumber && (
                    <Text type="secondary" className="!text-sm !mt-2">
                      Thẻ: **** **** **** {paymentData.cardNumber?.slice(-4)}
                    </Text>
                  )}
              </div>
            </div>
          </div>

          {/* Thông tin tổng quan */}
          <Divider />
          <div className="!grid !grid-cols-2 md:!grid-cols-5 !gap-4 !text-center">
            <div className="!bg-white !p-3 !rounded-lg !border">
              <Text className="!text-xs !text-gray-500 !block">
                Tổng mũi tiêm
              </Text>
              <Text strong className="!text-lg !text-blue-600">
                {vaccine?.dosesRequired || 0}
              </Text>
            </div>
            <div className="!bg-white !p-3 !rounded-lg !border">
              <Text className="!text-xs !text-gray-500 !block">
                Khoảng cách
              </Text>
              <Text strong className="!text-lg !text-green-600">
                {vaccine?.duration || 0} ngày
              </Text>
            </div>
            <div className="!bg-white !p-3 !rounded-lg !border">
              <Text className="!text-xs !text-gray-500 !block">
                Lịch đã đặt
              </Text>
              <Text
                strong
                className={`!text-lg ${
                  doseSchedules.length === (vaccine?.dosesRequired || 0)
                    ? "!text-green-600"
                    : "!text-orange-600"
                }`}
              >
                {doseSchedules.length} / {vaccine?.dosesRequired || 0}
              </Text>
            </div>
            <div className="!bg-white !p-3 !rounded-lg !border">
              <Text className="!text-xs !text-gray-500 !block">Trạng thái</Text>
              <Text
                strong
                className={`!text-sm ${
                  doseSchedules.length === (vaccine?.dosesRequired || 0)
                    ? "!text-green-600"
                    : "!text-orange-600"
                }`}
              >
                {doseSchedules.length === (vaccine?.dosesRequired || 0)
                  ? "✓ Hoàn thành"
                  : "⚠ Chưa đủ"}
              </Text>
            </div>
            <div className="!bg-white !p-3 !rounded-lg !border">
              <Text className="!text-xs !text-gray-500 !block">
                Tổng thanh toán
              </Text>
              <Text strong className="!text-lg !text-red-600">
                {formatPrice(finalTotal)}
              </Text>
            </div>
          </div>
        </Card>
      </div>

      {/* Payment Summary */}
      <div className="!mb-8">
        <Title level={4} className="!mb-4">
          Tổng thanh toán
        </Title>
        <div className="!p-4 !bg-gray-50 !rounded-lg">
          <div className="!space-y-3">
            <div className="!flex !justify-between !items-center">
              <Text>Chi phí vaccine ({vaccine?.dosesRequired} mũi):</Text>
              <Text>
                {formatPrice(
                  (vaccine?.price || 0) * (vaccine?.dosesRequired || 1)
                )}
              </Text>
            </div>
            <div className="!flex !justify-between !items-center">
              <Text>Phí dịch vụ:</Text>
              <Text>{formatPrice(0)}</Text>
            </div>
            <div className="!flex !justify-between !items-center">
              <Text>Thuế VAT (0%):</Text>
              <Text>{formatPrice(0)}</Text>
            </div>
            <Divider />
            <div className="!flex !justify-between !items-center !text-lg">
              <Text strong>Tổng cộng:</Text>
              <Text strong className="!text-xl !text-blue-600">
                {formatPrice(finalTotal)}
              </Text>
            </div>
          </div>
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="!bg-yellow-50 !border !border-yellow-200 !p-4 !rounded-lg !mb-6">
        <Checkbox className="!mb-2">
          Tôi đồng ý với
          <Button type="link" className="!p-0 !mx-1">
            Điều khoản sử dụng
          </Button>
          và
          <Button type="link" className="!p-0 !mx-1">
            Chính sách bảo mật
          </Button>
        </Checkbox>
        <Checkbox>Tôi muốn nhận email khuyến mãi và cập nhật mới</Checkbox>
      </div>

      <div className="!flex !justify-between">
        <Button onClick={() => setCurrentStep(1)} className="!px-8 !rounded-lg">
          Quay lại thanh toán
        </Button>
        <Button
          type="primary"
          loading={loading}
          onClick={handlePlaceBooking}
          className="!px-8 !rounded-lg !bg-blue-600 hover:!bg-blue-700"
        >
          {loading
            ? "Đang xử lý..."
            : `Xác nhận đặt lịch - ${formatPrice(finalTotal)}`}
        </Button>
      </div>
    </Card>
  );
};

export default ReviewSection;
