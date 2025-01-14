import { prepareToken } from "../../../utils/jwtHelpers.mjs";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import AuthDBService from "../models/auth/authDBService.mjs";
import UsersDBService from "../models/user/UsersDBService.mjs";

class AuthController {
  static async signup(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const data = req.body;
        return res
          .status(400)
          .json({ errors: errors.array(), error: "Signup error", data: data });
      }

      const user = {
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
      };

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);

      const registeredUser = await AuthDBService.register(user);

      const token = prepareToken(
        {
          id: user.id,
          email: user.email,
        },
        req.headers
      );

      res.status(201).json({
        result: "Signed up successfully",
        token,
        registeredUser,
      });
    } catch (err) {
      res.status(500).json({ error: "Signup error" });
    }
  }

  static async login(req, res) {
    if (!req.body.email) {
      return res.status(401).json({ error: "Email is required" });
    }
    if (!req.body.password) {
      return res.status(401).json({ error: "Password is required" });
    }

    try {
      const foundUser = await AuthDBService.login(req.body.email);

      if (!foundUser) {
        return res.status(404).json({ error: "User not found" });
      }

      const result = await bcrypt.compare(
        req.body.password,
        foundUser.password
      );
      console.log(result);

      if (!result) {
        return res.status(401).json({ error: "Login error" });
      }
      const token = prepareToken(
        {
          id: foundUser.id,
          email: foundUser.email,
        },
        req.headers
      );
      res.status(200).json({
        result: "Authorized",
        token,
        foundUser: { ...foundUser, password: undefined },
      });
    } catch (err) {
      res.status(401).json({ error: "Login error" });
    }
  }

  static async loginWithCredential(req, res) {
    try {
      const foundUser = await UsersDBService.getById(req.user.id);

      res.status(200).json({
        result: "Authorized",
        foundUser: foundUser,
      });
    } catch (error) {
      res.status(401).json({ error: "Login error" });
    }
  }
}

export default AuthController;
