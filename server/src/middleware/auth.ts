import { PrismaClient } from "@prisma/client";
import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";

const secretKey = process.env.SECRET_KEY as string;
const prisma = new PrismaClient();

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  try {
    if (token) {
      const decoded = jwt.verify(token, secretKey);
      if (decoded) {
        req.body.author = decoded;
        const user = await prisma.user.findUnique({
          where: { id: req.body.author.id },
          select: {
            id: true,
            email: true,
            name: true,
            likedPosts: true,
            savedPosts: true
          }
        });
        if (user) {
          req.body.author = user;
          next();
        } else res.status(401).json({ error: "Unauthorized" });
      } else res.status(401).json({ error: "Unauthorized" });
    } else res.status(401).json({ error: "Unauthorized" });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Unauthorized" });
  }
};
