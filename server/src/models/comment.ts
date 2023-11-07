import { User } from "@prisma/client";

export type CreateCommentReqBody = {
  postId: number;
  content?: string | null;
  author: User;
}

export type UpdateCommentReqBody = {
  content?: string | null;
  author: User;
}

export type ReplyCommentReqBody = {
  content?: string | null;
  commentId: number;
  author: User;
}

export type DeleteCommentReqBody = {
  author: User;
}

export type GetCommentReqBody = {
  author: User;
}