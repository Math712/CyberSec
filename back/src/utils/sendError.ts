import { Response as IResponse } from "express";

export const sendError = (res: IResponse, error: any) => {
    res.status(error.status || 500).json({message: error.message})
}