import { Request, Response } from "express";
import NotionService from "../service";
import { sendJson } from "../utils";

const notionService = new NotionService();
export const getProjects = async (req: Request, res: Response) => {
    const result = await notionService.getProjects().catch((err) => {
        if (err) {
            sendJson(res, {
                error: true,
                message: "Error fetching projects"
            })
        }
    })
    sendJson(res, {
        message: "Projects fetched successfully",
        data: result
    })
};
