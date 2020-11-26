import "reflect-metadata";
import * as express from "express";
import * as cors from "cors";
import * as jwt from "jsonwebtoken";
import { json } from "body-parser";
import { createConnection } from "typeorm";
import { routes } from "./routing";
import { Request, Response } from "express";

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
      res.status(e.status).send(e.message);
    }
  };
  app[r.method]("/api" + r.url, handler);
});

app.listen(8888, () => console.log("Server started on port 8888"));
