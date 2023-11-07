import { Request, Response } from "express";
import { PrismaClient, User } from "@prisma/client";
import {
  CreatePostReqBody,
  DeletePostReqBody,
  LikePostReqBody,
  SavePostReqBody,
  UnlikePostReqBody,
  UnsavePostReqBody,
  UpdatePostReqBody,
  getLikedPostsReqBody,
  getMyPostsReqBody,
  getSavedPostsReqBody,
} from "../models/post";
import moment from "moment";
import B2 from "backblaze-b2";

const prisma = new PrismaClient();
const B2_APPLICATION_KEY = process.env.B2_APPLICATION_KEY as string;
const B2_ACCOUNT_ID = process.env.B2_ACCOUNT_ID as string;
const B2_BUCKET_ID = process.env.B2_BUCKET_ID as string;
const B2_PUBLIC_STORED_URL = process.env.B2_PUBLIC_STORED_URL as string;

async function b2UploadFile(
  file: any,
  author: User,
  callback: (url?: string) => void
) {
  const date = moment().format("YYYYMMDDHHmmss");
  const key = `${author.id}-${date}-${file.originalname}`;
  try {
    const b2 = new B2({
      applicationKey: B2_APPLICATION_KEY,
      applicationKeyId: B2_ACCOUNT_ID,
    });
    await b2.authorize();
    b2.getUploadUrl({
      bucketId: B2_BUCKET_ID,
    })
      .then((res) => {
        b2.uploadFile({
          uploadUrl: res.data.uploadUrl,
          uploadAuthToken: res.data.authorizationToken,
          fileName: key,
          data: file.buffer,
          mime: file.mimetype,
        })
          .then((res) => {
            callback(B2_PUBLIC_STORED_URL + res.data.fileName)
            console.log(res.data);
          })
          .catch((err) => {
            console.error(err);
            callback(undefined);
          });
      })
      .catch((err) => {
        console.error(err);
        callback(undefined);
      });
  } catch (error) {
    console.error(error);
    callback(undefined);
  }
}

class PostController {
  public async create(req: any, res: Response) {
    const { title, content, author } = req.body as CreatePostReqBody;
    try {
      const data = {
        title,
        content,
        published: true,
        authorId: author.id,
        likes: 0,
        date: new Date(),
      };
      if (req.file) {
        b2UploadFile(req.file, author, async (url?) => {
          const post = await prisma.post.create({
            data: {
              ...data,
              file: url
                ? {
                    url: url,
                    type: req.file.mimetype,
                  }
                : undefined,
            },
          });
          res.json({ message: "Post created successfully", postId: post.id });
        });
      } else {
        const post = await prisma.post.create({
          data,
        });
        res.json({ message: "Post created successfully", postId: post.id });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Unable to create post" });
    }
  }

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const { title, content, author } = req.body as UpdatePostReqBody;
    try {
      await prisma.post.update({
        where: { id: parseInt(id), authorId: author.id },
        data: { title, content },
      });
      res.json({ message: "Post updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Unable to update post" });
    }
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    const { author } = req.body as DeletePostReqBody;

    try {
      await prisma.post.delete({
        where: { id: parseInt(id), authorId: author.id },
      });
      res.json({ message: "Post deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Unable to delete post" });
    }
  }

  public async like(req: Request, res: Response) {
    const { id } = req.params;
    const { author } = req.body as LikePostReqBody;

    try {
      const liked = await prisma.user.findFirst({
        where: {
          id: author.id,
          likedPosts: {
            has: parseInt(id),
          },
        },
      });
      if (!liked) {
        await prisma.post.update({
          where: { id: parseInt(id) },
          data: {
            likes: {
              increment: 1,
            },
          },
        });
        await prisma.user.update({
          where: { id: author.id },
          data: {
            likedPosts: {
              push: parseInt(id),
            },
          },
        });
        res.json({ message: "Post liked successfully" });
      } else res.json({ message: "Post already liked" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Unable to like post" });
    }
  }

  public async unlike(req: Request, res: Response) {
    const { id } = req.params;
    const { author } = req.body as UnlikePostReqBody;

    try {
      const liked = await prisma.user.findFirst({
        where: {
          id: author.id,
          likedPosts: {
            has: parseInt(id),
          },
        },
      });
      if (liked) {
        const post = await prisma.post.update({
          where: { id: parseInt(id) },
          data: {
            likes: {
              decrement: 1,
            },
          },
        });
        await prisma.user.update({
          where: { id: author.id },
          data: {
            likedPosts: liked.likedPosts.filter((id) => id != post.id),
          },
        });
        res.json({ message: "Post unliked successfully" });
      } else res.json({ message: "Post was not liked" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Unable to unlike post" });
    }
  }

  public async save(req: Request, res: Response) {
    const { id } = req.params;
    const { author } = req.body as SavePostReqBody;

    try {
      await prisma.user.update({
        where: { id: author.id },
        data: {
          savedPosts: {
            push: parseInt(id),
          },
        },
      });
      res.json({ message: "Post saved successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Unable to save post" });
    }
  }

  public async unsave(req: Request, res: Response) {
    const { id } = req.params;
    const { author } = req.body as UnsavePostReqBody;

    try {
      const postId = parseInt(id);
      await prisma.user.update({
        where: { id: author.id },
        data: {
          savedPosts: author.savedPosts.filter((id) => id != postId),
        },
      });
      res.json({ message: "Post unsaved successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Unable to unsave post" });
    }
  }

  public async get(req: Request, res: Response) {
    try {
      const posts = await prisma.post.findMany({
        orderBy: [
          {
            date: "desc",
          },
        ],
        include: {
          author: {
            select: {
              name: true,
            },
          },
        },
      });
      const data = posts.map((post) => {
        return { ...post, date: moment(post.date).format("YYYY-MM-DD HH:mm") };
      });
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Unable to fetch posts" });
    }
  }

  public async getLikedPosts(req: Request, res: Response) {
    const { author } = req.body as getLikedPostsReqBody;

    try {
      const posts = await prisma.post.findMany({
        where: {
          id: { in: author.likedPosts },
        },
        orderBy: [
          {
            date: "desc",
          },
        ],
        include: {
          author: {
            select: {
              name: true,
            },
          },
        },
      });
      const data = posts.map((post) => {
        return { ...post, date: moment(post.date).format("YYYY-MM-DD HH:mm") };
      });
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Unable to fetch liked posts" });
    }
  }

  public async getSavedPosts(req: Request, res: Response) {
    const { author } = req.body as getMyPostsReqBody;

    try {
      const posts = await prisma.post.findMany({
        where: {
          id: { in: author.savedPosts },
        },
        orderBy: [
          {
            date: "desc",
          },
        ],
        include: {
          author: {
            select: {
              name: true,
            },
          },
        },
      });
      const data = posts.map((post) => {
        return { ...post, date: moment(post.date).format("YYYY-MM-DD HH:mm") };
      });
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Unable to fetch saved posts" });
    }
  }

  public async getMyPosts(req: Request, res: Response) {
    const { author } = req.body as getSavedPostsReqBody;

    try {
      const posts = await prisma.post.findMany({
        where: {
          authorId: author.id,
        },
        orderBy: [
          {
            date: "desc",
          },
        ],
        include: {
          author: {
            select: {
              name: true,
            },
          },
        },
      });
      const data = posts.map((post) => {
        return { ...post, date: moment(post.date).format("YYYY-MM-DD HH:mm") };
      });
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Unable to fetch my posts" });
    }
  }
}

export default PostController;
