import { ServiceGETMethodProps, ServicePOSTMethodProps } from "@/types/services";
import axios from "axios";

namespace AuthService {
  export function login({
    body,
    config,
    then,
    error,
  }: ServicePOSTMethodProps): void {
    axios.post("https://www.gyartx.space/auth/login", body, config).then(
      (res: any) => {
        if (then) then(res);
      },
      (err: any) => {
        if (error) error(err);
      }
    );
  }

  export function register({
    body,
    config,
    then,
    error,
  }: ServicePOSTMethodProps): void {
    axios.post("https://www.gyartx.space/auth/register", body, config).then(
      (res: any) => {
        if (then) then(res);
      },
      (err: any) => {
        if (error) error(err);
      }
    );
  }

  export function googleUrl({
    config,
    then,
    error,
  }: ServiceGETMethodProps): void {
    axios.get("https://www.gyartx.space/auth/google/url", config).then(
      (res: any) => {
        if (then) then(res);
      },
      (err: any) => {
        if (error) error(err);
      }
    );
  }

  export function googleCallback({
    config,
    then,
    error,
  }: ServiceGETMethodProps): void {
    axios.get("https://www.gyartx.space/auth/google/redirect", config).then(
      (res: any) => {
        if (then) then(res);
      },
      (err: any) => {
        if (error) error(err);
      }
    );
  }
}

export default AuthService;
