import { AxiosRequestConfig } from "axios";

export type ServicePOSTMethodProps = {
  id?: number;
  body?: any;
  config?: AxiosRequestConfig<any>;
  then?: (res: any) => void;
  error?: (err: any) => void;
};

export type ServicePUTMethodProps = {
  id?: number;
  body: any;
  config?: AxiosRequestConfig<any>;
  then?: (res: any) => void;
  error?: (err: any) => void;
};

export type ServiceDELETEMethodProps = {
  id?: number;
  config?: AxiosRequestConfig<any>;
  then?: (res: any) => void;
  error?: (err: any) => void;
};

export type ServiceGETMethodProps = {
  id?: number;
  config?: AxiosRequestConfig<any>;
  then?: (res: any) => void;
  error?: (err: any) => void;
};

