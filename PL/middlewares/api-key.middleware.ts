import { NextFunction, Request, Response } from "express";
import { environment } from "../../environment/environment";
import { WinstonLog } from "../services/winston-logger.service";
import { ApiResponse } from "../../interfaces/response.model";
import { FinalResponse } from "../services/client-response.service";
import { CommonError } from "../../services/common-errors.service";

export function verifyApiKey(req: Request, res: Response, next: NextFunction) {
    let apiKey: string = req.headers.apikey && req.headers.apikey.toString()

    if (!apiKey || environment.API_KEY != apiKey) {
        WinstonLog.error('Api key is invalid', req.headers)

        let response: ApiResponse<any> = CommonError.UnAuthorized()

        return res.status(response.statusCode).send(FinalResponse(response))
    }

    next()
}