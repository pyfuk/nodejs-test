import { Request, Response, NextFunction } from "express";
import { AuthController } from "./src/controllers/auth.controller";
import { PingController } from "./src/controllers/ping.controller";
import { varifyToken } from "./src/utils/varity-token";

export interface Route {
  method: "get" | "post";
  url: string;
  varifyToken?: (req: Request, res: Response, next: NextFunction) => void;
  handler: (req: Request) => Promise<any>;
}

export const routes: Route[] = [
  /** Ping */
  {
    method: "get",
    url: "/ping",
    varifyToken: varifyToken,
    handler: PingController.ping,
  },

  /** Auth */
  { method: "post", url: "/signup", handler: AuthController.signup },
  {
    method: "post",
    url: "/signin",
    handler: AuthController.signin,
  },
];
