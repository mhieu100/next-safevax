import { BookingRequest, IBackendRes, PaymentResponse, UserBooking } from "@/types/backend";
import apiClient from "./apiClient";

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

/**
 * Get booking history of the current user
 * @returns List of historical bookings with appointments
 */
export async function getMyBookingHistory() {
  return apiClient.get<IBackendRes<UserBooking[]>>("/auth/history-booking");
}

/**
 * Reschedule an appointment
 * @param payload - Reschedule request data
 * @returns Updated appointment information
 */
export async function rescheduleAppointment(payload: {
  appointmentId: number;
  desiredDate: string;
  desiredTime: string;
  reason?: string;
}) {
  return apiClient.put<IBackendRes<unknown>>("/appointments/reschedule", payload);
}
