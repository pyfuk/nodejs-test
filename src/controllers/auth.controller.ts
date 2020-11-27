import { Request } from "express";
import { User } from "../entity/User";
import { comparePassword, encryptPassword } from "../utils/encrypt";
import { ControllerError } from "../utils/errors";
import * as jwt from "jsonwebtoken";
import { env } from "../environment/environment";
import { addInActiveToken } from "../utils/varity-token";

export const AuthController = {
  signup: async (req: Request) => {
    if (!req.body.login || !req.body.password) {
      throw new ControllerError("Все поля обязательны к заполнению", 400);
    }

    if (await User.findOne({ login: req.body.login }, { select: ["id"] })) {
      throw new ControllerError("Пользователь уже зарегистрирован", 400);
    }

    const user = await User.fromObj({
      login: req.body.login,
      password: await encryptPassword(req.body.password),
    }).save();

    return {
      user,
      token: jwt.sign({ id: user.id }, env.secret, { expiresIn: "600s" }),
    };
  },

  signin: async (req: Request) => {
    if (!req.body.login || !req.body.password) {
      throw new ControllerError("Все поля обязательны к заполнению", 400);
    }

    const user = await User.createQueryBuilder("user")
      .select(["user.id", "user.login", "user.password"])
      .where("user.login = :login", { login: req.body.login })
      .getOne();

    if (!user) {
      throw new ControllerError("Неправильный логин/пароль", 400);
    }
    if (!(await comparePassword(req.body.password, user.password))) {
      throw new ControllerError("Неправильный логин/пароль", 400);
    }

    return {
      user,
      token: jwt.sign({ id: user.id }, env.secret, { expiresIn: "600s" }),
    };
  },

  info: async (req: Request) => {
    const user = await User.createQueryBuilder("user")
      .select(["user.id", "user.login"])
      .where("user.id = :id", { id: req.userId })
      .getOne();

    return user;
  },

  logout: async (req: Request) => {
    addInActiveToken(req.userId, req.token);
    return { status: "success" };
  },
};
