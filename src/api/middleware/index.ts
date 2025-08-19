import { NextFunction, Request, Response } from 'express';
import { config } from 'dotenv';

config();

export function notFound(req: Request, res: Response, next: NextFunction) {
    res.status(404);
    const error = new Error(`Not Found - ${req.originalUrl}`);
    next(error);
}


/* eslint-disable @typescript-eslint/no-unused-vars */
export function errorHandler(err: Error, req: Request, res: Response, _next: NextFunction) {
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode);
    res.json({
        success: false,
        message: err.message,
        ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
    });
}

export const checkApiKey = (req: Request, res: Response, next: NextFunction): void => {
    const clientApiKey = req.headers['x-api-key'] as string | undefined;

    if (clientApiKey && clientApiKey === process.env.API_KEY) {
        next();
    } else {
        res.status(403).json({ error: true, message: 'Unauthorized' });
    }
};
