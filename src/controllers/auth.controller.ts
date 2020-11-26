import { Request } from "express";
import { ControllerError } from "../utils/errors";

export const AuthController = {
  ping: async (req: Request) => {
    return { status: "Api is alive!" };
  },

  signup: async (req: Request) => {
    if (!req.body.login || !req.body.password) {
      throw new ControllerError("Все поля обязательны к заполнению", 400);
    }
    return {};
  },
};
