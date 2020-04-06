import { NextFunction, Request, Response } from "express";
import { UserRole } from "../services/role.service";
import { WinstonLog } from "../services/winston-logger.service";
import { CommonError } from "../../services/common-errors.service";
import { FinalResponse } from "../services/client-response.service";

export function verifyUserRole(req: Request, res: Response, next: NextFunction) {
    // validating user role
    let selectedRole: string = req.headers.role.toString()

    if (!UserRole.isValid(selectedRole)) {
        WinstonLog.error(`Invalid role provided`, req.headers)

        let response = CommonError.UnAuthorized()

        return res.status(response.statusCode).send(FinalResponse(response))
    }

    next()
}