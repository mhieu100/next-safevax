import { IAccount, IBackendRes, IUser } from "@/types/backend";
import apiClient from "./apiClient";

export interface RegisterRequest {
  user: {
    fullName: string;
    email: string;
    password: string;
  };
  patientProfile: PatientProfile;
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

export async function callLogin(username: string, password: string) {
  return await apiClient.post<IBackendRes<IAccount>>("/auth/login/password", {
    username,
    password,
  });
}

export const callLogout = () => {
  return apiClient.post<IBackendRes<string>>("/auth/logout");
};

export async function callResgister(payload: RegisterRequest) {
  return await apiClient.post<IBackendRes<IAccount>>("/auth/register", payload);
}

/**
 * Update user avatar
 * @param avatarUrl - The full URL of the uploaded avatar
 * @returns Updated user account information
 */
export async function updateAvatar(avatarUrl: string) {
  return await apiClient.post<IBackendRes<IUser>>("/auth/avatar", {
    avatarUrl: avatarUrl,
  });
}
