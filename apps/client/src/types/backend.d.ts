/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IBackendRes<T> {
  error?: string | string[];
  message: string;
  statusCode: number | string;
  data?: T;
}

export interface IModelPaginate<T> {
  meta: IMeta;
  result: T[];
}

export interface IMeta {
  page: number;
  pageSize: number;
  pages: number;
  total: number;
}

export interface IAccount {
  accessToken: string;
  user: User;
}

export interface IUser {
  id: number;
  avatar: string;
  fullName: string;
  email: string;
  phone: string;
  birthday: string;
  gender: "MALE" | "FEMALE";
  address: string;
  identityNumber: string;
  bloodType: "A" | "B" | "O" | "AB";
  heightCm: number;
  weightKg: number;
  occupation: string;
  lifestyleNotes: string;
  insuranceNumber: string;
  consentForAIAnalysis: boolean;
  role: "ADMIN" | "DOCTOR" | "NURSE" | "PATIENT";
}

export interface IVaccine {
  contraindications: string[];
  country: string;
  description: string;
  descriptionShort: string;
  dosesRequired: number;
  duration: number;
  id: number;
  image: string;
  injection: string[];
  manufacturer: string;
  name: string;
  preserve: string[];
  price: number;
  slug: string;
  stock: number;
  rating: number;
  reviews: number;
}

export interface IDoseSchedule {
  doseNumber: number;
  date: Dayjs;
  time: string;
  centerId: string;
}

export interface ICenter {
  centerId: string;
  name: string;
  address: string;
  phoneNumber?: string;
  capacity?: number;
  latitude?: number;
  longitude?: number;
}

export interface ICartItem {
  vaccine: IVaccine;
  quantity: number;
}

export interface IBookingData {
  vaccine: IVaccine | null;

  appointmentData: {
    bookingFor: "self" | "family";
    familyMemberId?: number;
    firstDoseDate?: Dayjs;
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
export interface RegisterRequest {
  user: {
    fullName: string;
    email: string;
    password: string;
  };
  patientProfile: PatientProfile;
}

export interface UpdatePasswordRequest {
  email: string;
  oldPassword: string;
  newPassword: string;
}

export interface PatientProfile {
  address: string;
  phone: string;
  birthday: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  identityNumber: string;
  bloodType: "A" | "B" | "AB" | "O";
  heightCm: number;
  weightKg: number;
}

export interface BookingRequest {
  vaccineId: number;
  familyMemberId?: number;
  centerId: number;
  firstDoseDate: string;
  firstDoseTime: string;
  amount: number;
  doseSchedules: DoseSchedule[];
  paymentMethod: string;
}

export interface DoseSchedule {
  date: string;
  time: string;
  centerId: number;
}

export interface AppointmentDetail {
  appointmentId: number;
  doseNumber: number;
  scheduledDate: string;
  scheduledTime: string;
  centerId: number;
  centerName: string;
  doctorId: number | null;
  doctorName: string | null;
  cashierId: number | null;
  cashierName: string | null;
  appointmentStatus: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
}

export interface UserBooking {
  bookingId: number;
  patientId: number;
  patientName: string;
  familyMemberId: number | null;
  familyMemberName: string | null;
  vaccineName: string;
  totalAmount: number;
  totalDoses: number;
  bookingStatus: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
  createdAt: string;
  appointments: AppointmentDetail[];
}

export interface OrderRequest {
  items: ItemCart[];
  itemCount: number;
  paymentMethod: string;
  totalAmount: string;
}

export interface ItemCart {
  id: number;
  quantity: number;
}

export interface PaymentResponse {
  amount: number;
  method: string;
  paymentId: number;
  paymentURL: string;
  referenceId: string;
}

export interface BuildQueryParams {
  current: number;
  pageSize: number;
  filters?: Record<string, any>;
  sort?: Record<string, "ascend" | "descend">;
}

declare module "axios" {
  export interface AxiosResponse<T = any> extends Promise<T> {}
}
