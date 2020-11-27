import { Request, Response, NextFunction } from "express";
import { AuthController } from "./src/controllers/auth.controller";
import { FileController } from "./src/controllers/file.controller";
import { PingController } from "./src/controllers/ping.controller";
import { varifyToken } from "./src/utils/varity-token";

export interface Route {
  method: "get" | "post" | "delete" | "put";
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
  { method: "post", url: "/signin", handler: AuthController.signin },

  /** File */
  { method: "post", url: "/file/upload", handler: FileController.addFile },
  { method: "get", url: "/file/list", handler: FileController.getFiles },
  { method: "get", url: "/file/:id", handler: FileController.getFile },
  {
    method: "delete",
    url: "/file/delete/:id",
    handler: FileController.deleteFile,
  },
  {
    method: "put",
    url: "/file/update/:id",
    handler: FileController.updateFile,
  },
  {
    method: "get",
    url: "/file/download/:id",
    handler: FileController.downloadFile,
  },
];
