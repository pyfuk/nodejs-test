import { Request } from "express";
import { User } from "../entity/User";
import { encryptPassword } from "../utils/encrypt";
import { ControllerError } from "../utils/errors";

export const AuthController = {
  ping: async (req: Request) => {
    return { status: "Api is alive!" };
  },

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

    return user;
  },
};
