import { IBackendRes, OrderRequest, PaymentResponse } from "@/types/backend";
import apiClient from "./apiClient";

export async function callCreateOrder(payload: OrderRequest) {
  return apiClient.post<IBackendRes<PaymentResponse>>("/orders", payload);
}
