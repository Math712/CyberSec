import jwt from "jsonwebtoken";
import { Response, Request, NextFunction } from "express"
import { sendError } from "../utils/sendError";


export const middleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = jwt.verify(req.cookies?.['access_token'], 'mon secret');
        token ? next() : sendError(res, {message: "Arnt authorized to access", status: 403});
    } catch (e) {
        sendError(res, e);
    }
}