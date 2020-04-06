import { NextFunction, Request, Response } from "express";
import { Token } from "../../BLL/services/token.service";
import { USER_ROLE } from "../../enums/roles.enum";
import { ApiResponse } from "../../interfaces/response.model";
import { CommonError } from "../../services/common-errors.service";
import { FinalResponse } from "../services/client-response.service";
import { WinstonLog } from "../services/winston-logger.service";

export function verifyToken(req: Request, res: Response, next: NextFunction) {
    let response: ApiResponse<any>

    if (!req.headers.token) {
        WinstonLog.error('Token not provided', { headers: req.headers })

        response = CommonError.Login()
        return res.status(response.statusCode).send(FinalResponse(response))
    }

    let payLoad = new Token().verify(req)
    if (payLoad._id == undefined || payLoad._id == null || !USER_ROLE[payLoad.role]) {
        response = CommonError.Login()
        return res.status(response.statusCode).send(FinalResponse(response))
    }

    req.headers._id = payLoad._id
    req.headers.role = payLoad.role

    next()
}
