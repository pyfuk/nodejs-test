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
    handler: PingController.ping,
  },

  /** Auth */
  { method: "post", url: "/signup", handler: AuthController.signup },
  { method: "post", url: "/signin", handler: AuthController.signin },
  {
    method: "get",
    url: "/info",
    varifyToken: varifyToken,
    handler: AuthController.info,
  },

  /** File */
  {
    method: "post",
    url: "/file/upload",
    varifyToken: varifyToken,
    handler: FileController.addFile,
  },
  {
    method: "get",
    url: "/file/list",
    varifyToken: varifyToken,
    handler: FileController.getFiles,
  },
  {
    method: "get",
    url: "/file/:id",
    varifyToken: varifyToken,
    handler: FileController.getFile,
  },
  {
    method: "delete",
    url: "/file/delete/:id",
    varifyToken: varifyToken,
    handler: FileController.deleteFile,
  },
  {
    method: "put",
    url: "/file/update/:id",
    varifyToken: varifyToken,
    handler: FileController.updateFile,
  },
  {
    method: "get",
    url: "/file/download/:id",
    varifyToken: varifyToken,
    handler: FileController.downloadFile,
  },
];
