import { Router } from "express";
import AuthController from "../../controllers/authController";
import { authenticate } from "../../middleware/auth";

const authRouter: Router = Router();
const authController = new AuthController();

authRouter.get("/google/url", authController.googleURL);
authRouter.get("/google/redirect", authController.googleRedirect);
authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);

export default authRouter;