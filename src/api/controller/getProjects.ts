import { Request, Response } from "express";
import { redis } from "../config/redis";
import { notionService } from "../service";
import { sendJson } from "../utils";



export const getProjects = async (req: Request, res: Response) => {
    const cachedData = await redis.get("projects");
    if (cachedData) {
        return sendJson(res, {
            message: "Projects fetched successfully",
            data: JSON.parse(cachedData)
        });
    } else {
        const result = await notionService.getProjects().catch((err) => {
            if (err) {
                sendJson(res, {
                    error: true,
                    message: "Error fetching projects"
                })
                return
            }
        })
        await redis.setex("projects", 3600, JSON.stringify(result));
        sendJson(res, {
            message: "Projects fetched successfully",
            data: result
        })
    }

};
