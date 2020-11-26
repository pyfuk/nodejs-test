import "reflect-metadata";
import * as express from "express";
import * as cors from "cors";
import { json } from "body-parser";
import { createConnection } from "typeorm";
import { routes } from "./routing";
import { Request, Response, NextFunction } from "express";

import { env } from "./src/environment/environment";

const app = express();

app.use(cors());
app.use(json());

app.connection = createConnection();

routes.forEach((r) => {
  const handler = async (req: Request, res: Response) => {
    try {
      const result = await r.handler(req);
      return res.send(result);
    } catch (e) {
      e.status = e.status || 500;
      res.status(e.status).send(e.message);
    }
  };

  const varifyToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (r.varifyToken) {
      try {
        await r.varifyToken(req, res, next);
      } catch (e) {
        e.status = e.status || 500;
        res.status(e.status).send(e.message);
      }
    } else {
      next();
    }
  };

  app[r.method]("/api" + r.url, varifyToken, handler);
});

app.listen(env.apiPort, () => console.log("Server started on port 8888"));
