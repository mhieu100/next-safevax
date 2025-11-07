import { PaymentRequest } from "@/types/backend";
import apiClient from "./apiClient";

export async function callUpdatePaymentPaypal(payload: PaymentRequest) {
  return apiClient.post("/payments/paypal", payload);
}