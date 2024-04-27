import axios from "axios";
// NOTE: Created an axios instance in utils
import { axiosInstance } from "../lib/utils";


interface UserData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface ApiResponse<T = any> {
  data: T;
}

// MARK: Admin register
export const register = async (userData: UserData): Promise<ApiResponse> => {
  try {
    // NOTE: used axios instance in the request
    const response = await axiosInstance.post<ApiResponse>(
      // NOTE: removed baseURL
      `/admin/register`,
      userData
    );
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const login = async (
  email: string,
  password: string
): Promise<ApiResponse> => {
  try {
    // NOTE: used axios instance in the resuest
    const response = await axiosInstance.post<ApiResponse>(
      // NOTE: removed base url
      `/admin/login`,
      { email, password }
    );
    console.log("response", response.data)
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
