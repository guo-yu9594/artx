import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { LoginReqBody, RegisterReqBody } from "../models/auth";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import axios from "axios";

const secretKey = process.env.SECRET_KEY as string;
const prisma = new PrismaClient();
const oAuth2Client = new OAuth2Client(
  process.env.GOOGLE_OAUTH2_ID,
  process.env.GOOGLE_OAUTH2_SECRET,
  process.env.GOOGLE_OAUTH2_REDIRECT
);

class AuthController {
  public async googleURL(_: Request, res: Response) {
    try {
      const authorizeUrl = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: [
          "https://www.googleapis.com/auth/userinfo.profile",
          "https://www.googleapis.com/auth/userinfo.email ",
        ],
      });
      res.json({
        authorizeUrl,
      });
    } catch (err) {
      res.status(500).json({
        message: "Unable to get the authorization url.",
      });
    }
  }

  public async googleRedirect(req: Request, res: Response) {
    const code = req.query.code as string | undefined;

    if (code) {
      try {
        const r = await oAuth2Client.getToken(code);
        oAuth2Client.setCredentials(r.tokens);
        const user = await axios.get(
          `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${r.tokens.access_token}`
        );

        const userInDB = await prisma.user.findUnique({
          where: {
            email: user.data.email,
          },
        });
        if (userInDB) {
          const { password, ...rest } = userInDB;
          const token = jwt.sign(rest, secretKey, {
            expiresIn: "7d",
          });
          res.json({ token });
        } else {
          const newUser = await prisma.user.create({
            data: {
              email: user.data.email,
              password: "",
              name: user.data.name,
            },
          });
          const { password, ...rest } = newUser;
          const token = jwt.sign(rest, secretKey, {
            expiresIn: "7d",
          });
          res.json({ token });
        }
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Google authentication failed." });
      }
    } else
      res.status(400).json({ message: "Missing code in the query params" });
  }

  public async register(req: Request, res: Response) {
    try {
      const body = req.body as RegisterReqBody;
      bcrypt.hash(body.password, 10, async (err, hash) => {
        const user = await prisma.user.create({
          data: {
            email: body.email,
            password: hash,
            name: body.username,
          },
        });
        const { password, ...rest } = user;
        const token = jwt.sign(rest, secretKey, {
          expiresIn: "7d",
        });
        res.status(200).json({
          token,
        });
        console.log(
          `User "${user.name}" ID ${user.id}, has been registered successfully.`
        );
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  public async login(req: Request, res: Response) {
    const body = req.body as LoginReqBody;

    try {
      const user = await prisma.user.findUnique({
        where: {
          email: body.email,
        },
      });
      if (user) {
        bcrypt.compare(body.password, user.password, function (err, result) {
          if (result === true) {
            const { password, ...rest } = user;
            const token = jwt.sign(rest, secretKey, {
              expiresIn: "7d",
            });
            res.status(200).json({ token });
            console.log(
              `User "${user.name}" ID ${user.id}, has been logged in successfully.`
            );
          } else res.status(401).json({ message: "Incorrect email or password" });
        });
      } else res.status(401).json({ message: "Incorrect email or password" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

export default AuthController;
