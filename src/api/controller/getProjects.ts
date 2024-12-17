import { Request, Response } from "express";
import { sendJson } from "../utils";
import { notionService } from "../service";
import { client } from "../config/redis";


export const getProjects = async (req: Request, res: Response) => {
    const cachedData = await client.get("projects");
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
        await client.setEx("projects", 3600, JSON.stringify(result));
        sendJson(res, {
            message: "Projects fetched successfully",
            data: result
        })
    }

};
