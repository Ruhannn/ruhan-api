import { Request, Response } from "express";
import { notionService } from "../service";
import { sendJson } from "../utils";
import { client } from "../config/redis";


export const getTotalProjects = async (req: Request, res: Response) => {
    const cachedData = await client.get("totalProjects");
    if (cachedData) {
        return sendJson(res, {
            message: "Total Project fetched successfully",
            data: JSON.parse(cachedData)
        });
    } else {
        const result = await notionService.getTotalProjects().catch((err) => {
            if (err) {
                sendJson(res, {
                    error: true,
                    message: "Error fetching Total projects"
                })
                return
            }
        })
        await client.setEx("totalProjects", 3600, JSON.stringify(result));
        sendJson(res, {
            message: "Total Project fetched successfully",
            data: result
        })
    }
};
