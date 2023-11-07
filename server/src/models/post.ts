import { User } from "@prisma/client";

export type CreatePostReqBody = {
  title: string;
  content?: string | null;
  author: User;
}

export type UpdatePostReqBody = {
  title: string;
  content?: string | null;
  author: User;
}

export type LikePostReqBody = {
  author: User;
}

export type UnlikePostReqBody = {
  author: User;
}

export type SavePostReqBody = {
  author: User;
}

export type UnsavePostReqBody = {
  author: User;
}

export type DeletePostReqBody = {
  author: User;
}

export type getLikedPostsReqBody = {
  author: User;
}

export type getSavedPostsReqBody = {
  author: User;
}

export type getMyPostsReqBody = {
  author: User;
}

export type UploadFileReqBody = {
  author: User;
}