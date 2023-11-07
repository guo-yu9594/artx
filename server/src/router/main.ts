import { Router } from "express";
import authRouter from "./routes/auth";
import postRouter from "./routes/post";
import commentRouter from "./routes/comment";
import userRouter from "./routes/user";

const router = Router();

router.use("/auth", authRouter);
router.use("/post", postRouter);
router.use("/comment", commentRouter);
router.use("/user", userRouter);

export default router;
