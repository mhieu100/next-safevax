import { useAuthStore } from "@/store/authStore";
import { IBackendRes } from "@/types/backend";
import { Mutex } from "async-mutex";
import axios from "axios";

const mutex = new Mutex();
const NO_RETRY_HEADER = "x-no-retry";

interface AccessTokenResponse {
  accessToken: string;
}

const apiClient = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});
const handleRefreshToken = async (): Promise<string | null> => {
  return await mutex.runExclusive(async () => {
    const response =
      await apiClient.get<IBackendRes<AccessTokenResponse>>("/auth/refresh");
    if (response && response.data) return response.data.accessToken;
    else {
      const { logout } = useAuthStore.getState();
      logout();
      return null;
    }
  });
};

apiClient.interceptors.request.use((config) => {
  if (
    typeof window !== "undefined" &&
    window &&
    window.localStorage &&
    window.localStorage.getItem("token")
  ) {
    config.headers.Authorization =
      "Bearer " + window.localStorage.getItem("token");
  }
  if (!config.headers.Accept && config.headers["Content-Type"]) {
    config.headers.Accept = "application/json";
    config.headers["Content-Type"] = "application/json; charset=utf-8";
  }
  return config;
});

// Add a response interceptor
apiClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    if (
      error.config &&
      error.response &&
      +error.response.status === 401 &&
      !error.config.headers[NO_RETRY_HEADER]
    ) {
      const token = await handleRefreshToken();
      error.config.headers[NO_RETRY_HEADER] = "true";
      if (token) {
        error.config.headers["Authorization"] = `Bearer ${token}`;
        localStorage.setItem("token", token);
        return apiClient.request(error.config);
      }
    }
    return error?.response?.data ?? Promise.reject(error);
  }
);

export default apiClient;
