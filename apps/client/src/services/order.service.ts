import { IBackendRes } from "@/types/backend";
import apiClient from "./apiClient";

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
  amount: number
  method: string
  paymentId: number
  paymentURL: string
  referenceId: string
}

export async function callCreateOrder(payload: OrderRequest) {
  return apiClient.post<IBackendRes<PaymentResponse>>("/orders", payload);
}
