import { NextFunction, Request, Response } from "express";
import { environment } from "../../environment/environment";
import { ApiResponse } from "../../interfaces/response.model";
import { CommonError } from "../../services/common-errors.service";
import { WinstonLog } from "../services/winston-logger.service";

export function verifyApiKey(req: Request, res: Response, next: NextFunction) {
    let apiKey: string = req.headers.apikey && req.headers.apikey.toString()

    if (!apiKey || environment.API_KEY != apiKey) {
        WinstonLog.error('Api key is invalid', req.headers)

        let response: ApiResponse<any> = CommonError.UnAuthorized()
        return res.status(response.statusCode).send(response)
    }

    next()
}