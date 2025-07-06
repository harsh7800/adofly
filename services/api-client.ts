import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosInstance,
} from "axios";
import { toast } from "sonner";

export const createAxiosInstance = (baseURL: string): AxiosInstance => {
  const instance = axios.create({
    baseURL,

    transformRequest: [
      (data: unknown): string | unknown => {
        // Skip transformation for FormData to preserve binary content
        if (data instanceof FormData) {
          return data;
        }

        return data;
      },
      ...(axios.defaults.transformRequest as Array<(data: unknown) => unknown>),
    ],

    transformResponse: [
      ...(axios.defaults.transformResponse as Array<
        (data: unknown) => unknown
      >),
      (data: unknown): unknown => {
        return data;
      },
    ],
  });

  if (typeof window !== "undefined") {
    instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        return config;
      },
      (error: Error): Promise<Error> => {
        return Promise.reject(error);
      }
    );
  }
  instance.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => {
      if (response.status === 401) {
        window.location.href = "/login";
      }
      return response;
    },
    (error: AxiosError): Promise<never> => {
      const status = error.response?.status;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const message = (error.response?.data as any)?.message || error.message;

      // Avoid showing error if you're on login route
      if (
        typeof window !== "undefined" &&
        window.location.pathname === "/login"
      ) {
        toast.error(message || "Something went wrong.");

        return Promise.reject(error);
      }

      // Handle specific status codes
      if (status === 401) {
        toast.error("Session expired. Please log in again.");
        window.location.href = "/login";
      } else if (status === 403) {
        toast.error("You do not have permission to perform this action.");
      } else if (status === 500) {
        toast.error("Internal Server Error. Please try again later.");
      } else {
        toast.error(message || "Something went wrong.");
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

export const API = createAxiosInstance(process.env.NEXT_PUBLIC_API_URL!);
