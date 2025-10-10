import { IBackendRes, ICenter } from "@/types/backend";
import apiClient from "./apiClient";

export async function callGetCenters() {
  return apiClient.get<IBackendRes<ICenter[]>>("/centers");
}

export async function callGetCenterById(id: string) {
  return apiClient.get<IBackendRes<ICenter>>(`/centers/${id}`);
}