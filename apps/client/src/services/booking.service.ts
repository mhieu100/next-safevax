import { IBackendRes } from "@/types/backend";
import apiClient from "./apiClient";
import { PaymentResponse } from "./order.service";

export interface BookingRequest {
  vaccineId: number;
  familyMemberId?: number;
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

export async function callCreateBooking(payload: BookingRequest) {
  return apiClient.post<IBackendRes<PaymentResponse>>("/bookings", payload);
}
