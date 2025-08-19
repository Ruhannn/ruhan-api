import { Response } from 'express';

export function sendJson<T>(res: Response, { message, data, error }: { message: unknown; data?: T; error?: boolean }, status?: number): void {
    res.status(status ?? 200).json({
        success: error ? false : true,
        message: message,
        data: error ? [] : data,
    });
}


