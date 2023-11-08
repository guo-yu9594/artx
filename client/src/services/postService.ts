import {
  ServiceDELETEMethodProps,
  ServiceGETMethodProps,
  ServicePOSTMethodProps,
  ServicePUTMethodProps,
} from "@/types/services";
import { ReqDefaultConfig, handleReqConfig } from "@/utils/services";
import axios from "axios";

namespace PostService {
  export function getNews({
    config = ReqDefaultConfig,
    then,
    error,
  }: ServiceGETMethodProps): void {
    axios.get(`https://www.gyartx.space/post/`, handleReqConfig(config)).then(
      (res: any) => {
        if (then) then(res);
      },
      (err: any) => {
        if (error) error(err);
      }
    );
  }

  export function getMyPosts({
    config = ReqDefaultConfig,
    then,
    error,
  }: ServiceGETMethodProps): void {
    axios.get(`https://www.gyartx.space/post/my`, handleReqConfig(config)).then(
      (res: any) => {
        if (then) then(res);
      },
      (err: any) => {
        if (error) error(err);
      }
    );
  }

  export function getLikedPosts({
    config = ReqDefaultConfig,
    then,
    error,
  }: ServiceGETMethodProps): void {
    axios.get(`https://www.gyartx.space/post/liked`, handleReqConfig(config)).then(
      (res: any) => {
        if (then) then(res);
      },
      (err: any) => {
        if (error) error(err);
      }
    );
  }

  export function getSavedPosts({
    config = ReqDefaultConfig,
    then,
    error,
  }: ServiceGETMethodProps): void {
    axios.get(`https://www.gyartx.space/post/saved`, handleReqConfig(config)).then(
      (res: any) => {
        if (then) then(res);
      },
      (err: any) => {
        if (error) error(err);
      }
    );
  }

  export function create({
    body = {},
    config = ReqDefaultConfig,
    then,
    error,
  }: ServicePOSTMethodProps): void {
    axios
      .post(`https://www.gyartx.space/post/create`, body, handleReqConfig(config))
      .then(
        (res: any) => {
          if (then) then(res);
        },
        (err: any) => {
          if (error) error(err);
        }
      );
  }

  export function like({
    id,
    body = {},
    config = ReqDefaultConfig,
    then,
    error,
  }: ServicePOSTMethodProps): void {
    axios
      .post(
        `https://www.gyartx.space/post/like/${id}`,
        body,
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

  export function unlike({
    id,
    body = {},
    config = ReqDefaultConfig,
    then,
    error,
  }: ServicePOSTMethodProps): void {
    axios
      .post(
        `https://www.gyartx.space/post/unlike/${id}`,
        body,
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

  export function save({
    id,
    body = {},
    config = ReqDefaultConfig,
    then,
    error,
  }: ServicePOSTMethodProps): void {
    axios
      .post(
        `https://www.gyartx.space/post/save/${id}`,
        body,
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

  export function unsave({
    id,
    body = {},
    config = ReqDefaultConfig,
    then,
    error,
  }: ServicePOSTMethodProps): void {
    axios
      .post(
        `https://www.gyartx.space/post/unsave/${id}`,
        body,
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

  export function uploadFile({
    body = {},
    config = ReqDefaultConfig,
    then,
    error,
  }: ServicePOSTMethodProps): void {
    axios
      .post(
        `https://www.gyartx.space/post/upload-file`,
        body,
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

  export function update({
    id,
    body,
    config = ReqDefaultConfig,
    then,
    error,
  }: ServicePUTMethodProps): void {
    axios
      .put(
        `https://www.gyartx.space/post/update/${id}`,
        body,
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

  export function remove({
    id,
    config = ReqDefaultConfig,
    then,
    error,
  }: ServiceDELETEMethodProps): void {
    axios
      .delete(
        `https://www.gyartx.space/post/delete/${id}`,
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

export default PostService;
