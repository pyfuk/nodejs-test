import { Request, Response, NextFunction } from "express";
import { ControllerError } from "./errors";
import * as jwt from "jsonwebtoken";
import { env } from "../environment/environment";

let inActiveTokens = [];

export const addInActiveToken = (userId, token) => {
  inActiveTokens.push({ userId: userId, token: token });
};

export const varifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    req.token = token;

    if (inActiveTokens.find((it) => it.token == token)) {
      throw new ControllerError("Токен не действителен", 403);
    }
    jwt.verify(token, env.secret, (err, authData) => {
      if (err) {
        throw new ControllerError("Токен не действителен", 403);
      } else {
        req.userId = authData.id;
      }
    });
    next();
  } else {
    throw new ControllerError("Требуется токен", 403);
  }
};
