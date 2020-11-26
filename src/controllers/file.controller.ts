import { Request } from "express";

export const FileController = {
  ping: async (req: Request) => {
    return { status: "Api is alive!" };
  },
};
