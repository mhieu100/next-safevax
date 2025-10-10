import { IBackendRes } from "@/types/backend";
import apiClient from "./apiClient";

export interface FamilyMemberRequest {
  fullName: string;
  dateOfBirth: string;
  relationship: string;
  phone?: string;
  gender: "MALE" | "FEMALE";
}

export interface FamilyMemberResponse {
  id: number;
  fullName: string;
  dateOfBirth: string;
  relationship: string;
  phone?: string;
  gender: "MALE" | "FEMALE";
  createdAt?: string;
  updatedAt?: string;
}

export interface FamilyMemberUpdateRequest extends FamilyMemberRequest {
  id: number;
}

export async function callCreateMember(data: FamilyMemberRequest) {
  return await apiClient.post<IBackendRes<FamilyMemberResponse>>(
    "/api/family-members",
    data
  );
}

// export async function callGetAllMember() {
//   return await apiClient.get<IBackendRes<FamilyMemberResponse[]>>(
//     "/api/family-members"
//   );
// }

export async function callUpdateMember(data: FamilyMemberUpdateRequest) {
  return await apiClient.put<IBackendRes<FamilyMemberResponse>>(
    "/api/family-members",
    data
  );
}


export async function callDeleteMember(id: number) {
  return await apiClient.delete<IBackendRes<string>>(
    `/api/family-members/${id}`
  );
}
