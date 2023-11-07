import { ServiceGETMethodProps, ServicePOSTMethodProps } from "@/types/services";
import axios from "axios";

namespace AuthService {
  export function login({
    body,
    config,
    then,
    error,
  }: ServicePOSTMethodProps): void {
    axios.post("http://localhost:3001/auth/login", body, config).then(
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
    axios.post("http://localhost:3001/auth/register", body, config).then(
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
    axios.get("http://localhost:3001/auth/google/url", config).then(
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
    axios.get("http://localhost:3001/auth/google/redirect", config).then(
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
