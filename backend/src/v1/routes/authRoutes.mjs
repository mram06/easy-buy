import express from "express";
import { checkSchema } from "express-validator";
import UserValidator from "../../../validators/userValidator.mjs";

import AuthController from "../controllers/authController.mjs";

const router = express.Router();

router.post("/login", AuthController.login);
router.post(
  "/signup",
  checkSchema(UserValidator.userSchema),
  AuthController.signup
);
router.post("/login-with-credential", AuthController.loginWithCredential);

export default router;
