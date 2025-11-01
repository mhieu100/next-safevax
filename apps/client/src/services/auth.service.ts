import { IAccount, IBackendRes, IUser, RegisterRequest, UpdatePasswordRequest } from "@/types/backend";
import apiClient from "./apiClient";

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


export async function callChangePassword(payload: UpdatePasswordRequest) {
  return await apiClient.post<IBackendRes<boolean>>("/auth/update-password", payload);
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

export interface UpdateAccountRequest {
  user: {
    fullName: string;
  };
  patientProfile: {
    address?: string;
    phone?: string;
    birthday?: string; // "YYYY-MM-DD" format
    gender?: "MALE" | "FEMALE" | "OTHER";
    identityNumber?: string;
    bloodType?: "A" | "B" | "AB" | "O";
    heightCm?: number;
    weightKg?: number;
    occupation?: string;
    lifestyleNotes?: string;
    insuranceNumber?: string;
  };
}

/**
 * Update user account and patient profile
 * @param payload - User and patient profile data to update
 * @returns Updated user information
 */
export async function updateAccount(payload: UpdateAccountRequest) {
  return await apiClient.post<IBackendRes<IUser>>("/auth/update-account", payload);
}
