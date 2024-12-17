import { Request, Response } from "express";
import { sendJson } from "../utils";
import { notionService } from "../service";
import { redis } from "../config/redis";



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
        await redis.setex("skills", 3600, JSON.stringify(result));
        sendJson(res, {
            message: "Skills fetched successfully",
            data: result
        })
    }

};