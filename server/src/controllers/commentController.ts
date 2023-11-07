import { Request, Response } from "express";
import {
  CreateCommentReqBody,
  DeleteCommentReqBody,
  ReplyCommentReqBody,
  UpdateCommentReqBody,
} from "../models/comment";
import { PrismaClient } from "@prisma/client";
import moment from "moment";

const prisma = new PrismaClient();

class CommentController {
  public async create(req: Request, res: Response) {
    const { author, postId, content } = req.body as CreateCommentReqBody;

    try {
      const comment = await prisma.comment.create({
        data: {
          content,
          post: { connect: { id: postId } },
          author: { connect: { id: author.id } },
          date: new Date(),
        },
      });
      const data = {
        ...comment,
        date: moment(comment.date).format("YYYY-MM-DD HH:mm"),
      };
      res.json({ comment: data, message: "Post commented successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Unable to create comment" });
    }
  }

  public async update(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const { author, content } = req.body as UpdateCommentReqBody;

    try {
      const updatedComment = await prisma.comment.update({
        where: { id: id, authorId: author.id },
        data: {
          content: content,
        },
      });
      if (updatedComment) res.json(updatedComment);
      else throw new Error();
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Unable to update comment" });
    }
  }

  public async get(req: Request, res: Response) {
    try {
      const comments = await prisma.comment.findMany({
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
      res.json(comments);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Unable to fetch comments" });
    }
  }

  public async getPostComments(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    try {
      const comments = await prisma.comment.findMany({
        where: {
          postId: id,
          answerTo: null,
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
      const data = comments.map((post) => {
        return { ...post, date: moment(post.date).format("YYYY-MM-DD HH:mm") };
      });
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Unable to fetch comments" });
    }
  }

  public async getCommentReplies(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    try {
      const comments = await prisma.comment.findMany({
        where: {
          answerTo: id,
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
      const data = comments.map((post) => {
        return { ...post, date: moment(post.date).format("YYYY-MM-DD HH:mm") };
      });
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Unable to fetch replies" });
    }
  }

  public async reply(req: Request, res: Response) {
    const { author, content, commentId } = req.body as ReplyCommentReqBody;

    try {
      const comment = await prisma.comment.findUnique({
        where: {
          id: commentId,
        },
      });
      if (comment) {
        const replyComment = await prisma.comment.create({
          data: {
            content,
            answerTo: commentId,
            post: { connect: { id: comment.postId } },
            author: { connect: { id: author.id } },
            date: new Date(),
          },
        });
        res.json({
          content: replyComment,
          message: "Comment replied successfully",
        });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Unable to reply to comment" });
    }
  }

  public async delete(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const { author } = req.body as DeleteCommentReqBody;

    try {
      await prisma.comment.delete({
        where: { id: id },
      });
      res.json({ message: "Comment deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Unable to delete the comment" });
    }
  }
}

export default CommentController;
