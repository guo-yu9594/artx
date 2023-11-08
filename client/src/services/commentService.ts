import {
  ServiceDELETEMethodProps,
  ServiceGETMethodProps,
  ServicePOSTMethodProps,
  ServicePUTMethodProps,
} from "@/types/services";
import { ReqDefaultConfig, handleReqConfig } from "@/utils/services";
import axios from "axios";

namespace CommentService {
  export function getPostComments({
    id,
    config = ReqDefaultConfig,
    then,
    error,
  }: ServiceGETMethodProps): void {
    axios
      .get(`https://www.gyartx.space/comment/post/${id}`, handleReqConfig(config))
      .then(
        (res: any) => {
          if (then) then(res);
        },
        (err: any) => {
          if (error) error(err);
        }
      );
  }

  export function getCommentReplies({
    id,
    config = ReqDefaultConfig,
    then,
    error,
  }: ServiceGETMethodProps): void {
    axios
      .get(
        `https://www.gyartx.space/comment/replies/${id}`,
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

  export function create({
    body = {},
    config = ReqDefaultConfig,
    then,
    error,
  }: ServicePOSTMethodProps): void {
    axios
      .post(
        `https://www.gyartx.space/comment/create`,
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

  export function reply({
    body = {},
    config = ReqDefaultConfig,
    then,
    error,
  }: ServicePOSTMethodProps): void {
    axios
      .post(
        `https://www.gyartx.space/comment/reply`,
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
        `https://www.gyartx.space/comment/update/${id}`,
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
        `https://www.gyartx.space/comment/delete/${id}`,
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

export default CommentService;
