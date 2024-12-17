import { Request, Response } from "express";
import NotionService from "../service";
import { sendJson } from "../utils";

const notionService = new NotionService();
export const addViews = async (req: Request, res: Response) => {
    const pageId = req.params.id
    if (!pageId) {
        sendJson(res, {
            error: true,
            message: "Page ID is required"
        }, 400)
        return
    }
    const result = await notionService.addViews(pageId).catch((err) => {
        if (err) {
            sendJson(res, {
                error: true,
                message: "Something went wrong while adding views"
            }, 500)
            return
        }
    })
    sendJson(res, {
        message: "Views added successfully",
        data: result
    })
};
