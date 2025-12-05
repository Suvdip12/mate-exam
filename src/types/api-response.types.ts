/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: {
    path: string;
    message: string;
  }[];
  error?: string;
}
