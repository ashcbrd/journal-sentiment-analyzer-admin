import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// NOTE: Created an axxios intance with baseURL same as backend URL
export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000",
});
