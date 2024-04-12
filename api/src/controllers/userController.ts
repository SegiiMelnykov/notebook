import { NextFunction, Response } from "express";
import { AuthReq, SighnInAndUpReq, TokenResponse } from "../types/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ApiError from "../error/ApiError";

import { User } from "../models/user";

const generateJwt = (id: number, email: string) => {
  return jwt.sign({ id, email }, process.env.SECRET_KEY || "secret", {
    expiresIn: "24h",
  });
};

class UserController {
  async registration(
    req: SighnInAndUpReq<{ email: string; password: string }>,
    res: TokenResponse,
    next: NextFunction
  ) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(
          ApiError.badRequest("enter emeail and password to registration")
        );
      }

      const candidate = await User.findOne({ where: { email } });
      if (candidate) {
        return next(ApiError.forbidden("user with this email already exists"));
      }
      const hashPassword = await bcrypt.hash(password, 5);
      const user = await User.create({ email, password: hashPassword });
      const token = generateJwt(user.id, user.email);
      return res.json({ token });
    } catch (e) {
      console.log(e);
    }
  }

  async login(
    req: SighnInAndUpReq<{ email: string; password: string }>,
    res: TokenResponse,
    next: NextFunction
  ) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return next(ApiError.badRequest("user not found"));
      }
      const comparePassword = bcrypt.compareSync(password, user.password);
      if (!comparePassword) {
        return next(ApiError.forbidden("incorrect password or email"));
      }
      const token = generateJwt(user.id, user.email);
      return res.json({ token });
    } catch (e) {
      console.log(e);
    }
  }
  async check(req: AuthReq, res: TokenResponse, next: NextFunction) {
    try {
      const token = generateJwt(req.user.id, req.user.email);
      return res.json({ token });
    } catch (e) {
      console.log(e);
    }
  }
}

export default new UserController();
