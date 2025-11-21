import { IBackendRes } from "@/types/backend";
import apiClient from "./apiClient";

export interface UploadFileResponse {
  fileName: string;
  uploadedAt: string;
}

/**
 * Upload a single file to the server
 * @param file - The file to upload
 * @param folder - The folder to store the file (e.g., "user", "vaccine")
 * @returns The uploaded file URL and timestamp
 */
export async function uploadFile(file: File, folder: string = "user") {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folder);

  return apiClient.post<IBackendRes<UploadFileResponse>>("/files", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
