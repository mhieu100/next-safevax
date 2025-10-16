import { BookingRequest, IBackendRes, UserBooking } from "@/types/backend";
import apiClient from "./apiClient";
import { PaymentResponse } from "./order.service";

export async function callCreateBooking(payload: BookingRequest) {
  return apiClient.post<IBackendRes<PaymentResponse>>("/bookings", payload);
}

/**
 * Get all bookings of the current user
 * @returns List of user bookings with appointments
 */
export async function getMyBookings() {
  return apiClient.get<IBackendRes<UserBooking[]>>("/auth/booking");
}
