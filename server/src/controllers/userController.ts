import { Request, Response } from "express";
import { DeleteUserReqBody, GetUserReqBody } from "../models/user";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class UserController {
  public async get(req: Request, res: Response) {
    const { author } = req.body as GetUserReqBody;

    res.json({
      email: author.email,
      name: author.name,
      id: author.id,
    });
  }

  public async getLikedPostsId(req: Request, res: Response) {
    const { author } = req.body as GetUserReqBody;

    const data = await prisma.user.findUnique({
      where: {
        id: author.id,
      },
      select: {
        likedPosts: true,
      },
    });
    if (data) res.send(data.likedPosts);
    else res.status(500).json({ message: "Interal server error" });
  }

  public async getSavedPostsId(req: Request, res: Response) {
    const { author } = req.body as GetUserReqBody;

    const data = await prisma.user.findUnique({
      where: {
        id: author.id,
      },
      select: {
        savedPosts: true,
      },
    });
    if (data) res.send(data.savedPosts);
    else res.status(500).json({ message: "Interal server error" });
  }

  public async delete(req: Request, res: Response) {
    const { author } = req.body as DeleteUserReqBody;

    try {
      await prisma.comment.deleteMany({
        where: {
          authorId: author.id,
        },
      });
      await prisma.post.updateMany({
        where: {
          id: { in: author.likedPosts },
        },
        data: {
          likes: { decrement: 1 },
        },
      });
      await prisma.post.deleteMany({
        where: {
          authorId: author.id,
        },
      });
      await prisma.user.delete({
        where: { id: author.id },
      });
      res.json({ message: "User deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Unable to delete user" });
    }
  }
}

export default UserController;
