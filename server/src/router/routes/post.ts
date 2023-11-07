import { Router } from "express";
import { authenticate } from "../../middleware/auth";
import PostController from "../../controllers/postController";
import multer from 'multer';

const multerConfig = {
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 20 * 1024 * 1024, // File size limited to 20 Mo
  },
};

const uploadMiddleware = multer(multerConfig).single('file');

const postRouter: Router = Router();
const postController = new PostController();

/* Get */
postRouter.get("/", authenticate, postController.get);
postRouter.get("/liked", authenticate, postController.getLikedPosts);
postRouter.get("/saved", authenticate, postController.getSavedPosts);
postRouter.get("/my", authenticate, postController.getMyPosts);

/* Post */
postRouter.post("/create", uploadMiddleware, authenticate, postController.create);
postRouter.post("/like/:id", authenticate, postController.like);
postRouter.post("/unlike/:id", authenticate, postController.unlike);
postRouter.post("/save/:id", authenticate, postController.save);
postRouter.post("/unsave/:id", authenticate, postController.unsave);

/* Put */
postRouter.put("/update/:id", authenticate, postController.update);

/* Delete */
postRouter.delete("/delete/:id", authenticate, postController.delete);

export default postRouter;