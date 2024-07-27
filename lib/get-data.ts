import { axiosInstance } from "./utils";

export async function getData(data: string) {
  try {
    const response = await axiosInstance.get(data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data", error);
    return [];
  }
}
