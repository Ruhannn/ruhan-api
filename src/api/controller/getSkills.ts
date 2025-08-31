import { Request, Response } from "express";
import { redis } from "../config/redis";
import { notionService } from "../service";
import { sendJson } from "../utils";



export const getSkills = async (req: Request, res: Response) => {
    const cachedData = await redis.get("skills");
    if (cachedData) {
        return sendJson(res, {
            message: "Skills fetched successfully",
            data: JSON.parse(cachedData)
        });
    } else {
        const result = await notionService.getSkills().catch((err) => {
            if (err) {
                sendJson(res, {
                    error: true,
                    message: "Error fetching skills"
                })
                return
            }
        })
        await redis.set("skills",  JSON.stringify(result));
        sendJson(res, {
            message: "Skills fetched successfully",
            data: result
        })
    }

};
