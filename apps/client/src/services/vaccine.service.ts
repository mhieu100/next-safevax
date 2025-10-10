import { IBackendRes, IVaccine } from "@/types/backend";
import apiClient from "./apiClient";

export async function callFetchCountry() {
  return apiClient.get<IBackendRes<string[]>>("/vaccines/countries");
}

export async function callGetBySku(sku: string) {
  return apiClient.get<IBackendRes<IVaccine>>(`/vaccines/${sku}`);
}