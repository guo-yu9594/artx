import { Router } from "express";
import { authenticate } from "../../middleware/auth";
import UserController from "../../controllers/userController";

const userRouter: Router = Router();
const userController = new UserController();

/* Get */
userRouter.get('/', authenticate, userController.get);
userRouter.get('/liked-id', authenticate, userController.getLikedPostsId);
userRouter.get('/saved-id', authenticate, userController.getSavedPostsId);

/* Delete */
userRouter.delete('/delete', authenticate, userController.delete);

export default userRouter;