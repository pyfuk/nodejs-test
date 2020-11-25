import "reflect-metadata";
import * as express from "express";
import { createConnection } from "typeorm";
import * as jwt from "jsonwebtoken";

const app = express();

app.connection = createConnection();

app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to the API",
  });
});

app.listen(8888, () => console.log("Server started on port 8888"));
