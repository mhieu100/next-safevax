/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IBackendRes<T> {
  error?: string | string[];
  message: string;
  statusCode: number | string;
  data?: T;
}

export interface IModelPaginate<T> {
  meta: IMeta;
  result: T[];
}

export interface IMeta {
  page: number;
  pageSize: number;
  pages: number;
  total: number;
}

export interface IAccount {
  accessToken: string;
  user: User;
}

export interface IUser {
  id: number;
  avatar: string;
  fullName: string;
  email: string;
  phone: string;
  birthday: string;
  gender: "MALE" | "FEMALE";
  address: string;
  identityNumber: string;
  bloodType: "A" | "B" | "O" | "AB";
  heightCm: number;
  weightKg: number;
  occupation: string;
  lifestyleNotes: string;
  insuranceNumber: string;
  consentForAIAnalysis: boolean;
  role: "ADMIN" | "DOCTOR" | "NURSE" | "PATIENT";
}

export interface IVaccine {
  contraindications: string[];
  country: string;
  description: string;
  descriptionShort: string;
  dosesRequired: number;
  duration: number;
  id: number;
  image: string;
  injection: string[];
  manufacturer: string;
  name: string;
  preserve: string[];
  price: number;
  slug: string;
  stock: number;
  rating: number;
  reviews: number;
}


export interface ICenter {
  centerId: string;
  name: string;
  address: string;
  phoneNumber?: string;
  capacity?: number;
  latitude?: number;
  longitude?: number;
}

export interface ICartItem {
  vaccine: IVaccine;
  quantity: number;
}

export interface BuildQueryParams {
  current: number;
  pageSize: number;
  filters?: Record<string, any>;
  sort?: Record<string, "ascend" | "descend">;
}

declare module "axios" {
  export interface AxiosResponse<T = any> extends Promise<T> {}
}
