import { Request } from "express";
import { AuthController } from "./src/controllers/auth.controller";
import { PingController } from "./src/controllers/ping.controller";

export interface Route {
  method: "get" | "post";
  url: string;
  handler: (req: Request) => Promise<any>;
}

export const routes: Route[] = [
  /** Ping */
  { method: "get", url: "/ping", handler: PingController.ping },
  { method: "post", url: "/signup", handler: AuthController.signup },
];
