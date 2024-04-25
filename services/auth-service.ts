import axios from "axios";

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

export const register = async (userData: UserData): Promise<ApiResponse> => {
  try {
    const response = await axios.post<ApiResponse>(
      `${process.env.BASE_API_URL!}/register`,
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
    const response = await axios.post<ApiResponse>(
      `${process.env.BASE_API_URL!}/login`,
      { email, password }
    );
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
