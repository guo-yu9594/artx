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
    axios.get(`http://localhost:3001/post/`, handleReqConfig(config)).then(
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
    axios.get(`http://localhost:3001/post/my`, handleReqConfig(config)).then(
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
    axios.get(`http://localhost:3001/post/liked`, handleReqConfig(config)).then(
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
    axios.get(`http://localhost:3001/post/saved`, handleReqConfig(config)).then(
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
      .post(`http://localhost:3001/post/create`, body, handleReqConfig(config))
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
        `http://localhost:3001/post/like/${id}`,
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
        `http://localhost:3001/post/unlike/${id}`,
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
        `http://localhost:3001/post/save/${id}`,
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
        `http://localhost:3001/post/unsave/${id}`,
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
        `http://localhost:3001/post/upload-file`,
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
        `http://localhost:3001/post/update/${id}`,
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
        `http://localhost:3001/post/delete/${id}`,
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
