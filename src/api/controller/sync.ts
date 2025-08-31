import { Request, Response } from "express";
import { redis } from "../config/redis";

import { sendJson } from "../utils";

export const sync = async (req: Request, res: Response) => {
  try {
    await redis.del("projects");
    await redis.del("skills");

    return sendJson(res,  { message: "Cache cleared: projects & skills" },200);
  } catch (err) {
    console.error("Redis delete error:", err);
    return sendJson(res, { error:true, message: "Failed to clear cache" },500);
  }
};
