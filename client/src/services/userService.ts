import {
  ServiceDELETEMethodProps,
  ServiceGETMethodProps,
} from "@/types/services";
import { ReqDefaultConfig, handleReqConfig } from "@/utils/services";
import axios from "axios";

namespace UserService {
  export function getUserData({
    config = ReqDefaultConfig,
    then,
    error,
  }: ServiceGETMethodProps): void {
    axios.get("https://www.gyartx.space/user/", handleReqConfig(config)).then(
      (res: any) => {
        if (then) then(res);
      },
      (err: any) => {
        if (error) error(err);
      }
    );
  }

  export function getUserLikedPostsId({
    config = ReqDefaultConfig,
    then,
    error,
  }: ServiceGETMethodProps): void {
    axios
      .get("https://www.gyartx.space/user/liked-id", handleReqConfig(config))
      .then(
        (res: any) => {
          if (then) then(res);
        },
        (err: any) => {
          if (error) error(err);
        }
      );
  }

  export function getUserSavedPostsId({
    config = ReqDefaultConfig,
    then,
    error,
  }: ServiceGETMethodProps): void {
    axios
      .get("https://www.gyartx.space/user/saved-id", handleReqConfig(config))
      .then(
        (res: any) => {
          if (then) then(res);
        },
        (err: any) => {
          if (error) error(err);
        }
      );
  }

  export function remove({
    config = ReqDefaultConfig,
    then,
    error,
  }: ServiceDELETEMethodProps): void {
    axios
      .delete(
        `https://www.gyartx.space/user/delete/`,
        handleReqConfig(config)
      )
      .then(
        (res: any) => {
          if (then) then(res);
        },
        (err: any) => {
          if (error) error(err);
        }
      );
  }
}

export default UserService;
