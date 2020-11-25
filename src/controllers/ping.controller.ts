import { Request } from "express";

export const PingController = {
  ping: async (req: Request) => {
    return { status: "Api is alive!" };
  },
};
