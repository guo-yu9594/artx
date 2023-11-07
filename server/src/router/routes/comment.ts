import { Router } from "express";
import { authenticate } from "../../middleware/auth";
import CommentController from "../../controllers/commentController";

const commentRouter: Router = Router();
const commentController = new CommentController();

/* Get */
commentRouter.get("/", authenticate, commentController.get);
commentRouter.get("/post/:id", authenticate, commentController.getPostComments);
commentRouter.get("/replies/:id", authenticate, commentController.getCommentReplies);

/* Post */
commentRouter.post("/create", authenticate, commentController.create);
commentRouter.post("/reply", authenticate, commentController.reply);

/* Put */
commentRouter.put("/update/:id", authenticate, commentController.update);

/* Delete */
commentRouter.delete("/delete/:id", authenticate, commentController.delete);

export default commentRouter;