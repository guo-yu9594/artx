import { User } from "@prisma/client";

export type GetUserReqBody = {
  author: User;
}

export type DeleteUserReqBody = {
  author: User;
}