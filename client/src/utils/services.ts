import { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

export const ReqDefaultConfig: AxiosRequestConfig<any> = {
  headers: {
    Authorization: Cookies.get("artx-token"),
  },
};

export const handleReqConfig = (
  config?: AxiosRequestConfig<any>
): AxiosRequestConfig<any> => {
  if (!config || !config.headers || !config.headers.Authorization) {
    const token = Cookies.get("artx-token");
    if (!token) return {};
    return {
      headers: {
        Authorization: token,
      },
    };
  }
  return config;
};
