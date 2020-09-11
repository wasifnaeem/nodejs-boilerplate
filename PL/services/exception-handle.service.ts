import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS_CODE } from "../../enums/http-status-code.enum";
import { ApiResponse } from "../../interfaces/response.model";
import { CommonError } from "../../services/common-errors.service";
import { WinstonLog } from "./winston-logger.service";

export class ExceptionHandlerService {

    constructor() {
        process.on("uncaughtException", (error: Error) => {
            console.log('------ uncaughtException ------')
            console.log(error)
            WinstonLog.error(error.message, error)
        })

        process.on('unhandledRejection', (reason) => {
            console.log('------ unhandledRejection ------')
            console.log(reason)
            WinstonLog.error(reason)
        })
    }

    handler(error: any, req: Request, res: Response, next: NextFunction) {
        let response: ApiResponse<any>
        console.log('-------------------------########-------------------------')

        switch (error.name) {
            case 'MongoError':
                switch (error.code) {
                    case 11000:
                        let errmsg: string = error.errmsg
                        if (errmsg.includes('email'))
                            response = {
                                statusCode: 409,
                                statusMessage: `Account already exsits`
                            }
                        else
                            response = {
                                statusCode: 409,
                                statusMessage: `This information already exists`
                            }
                        break

                    case 28: // Path not viable
                    case 2: // bad value
                    default:
                        response = {
                            statusCode: 503,
                            statusMessage: `We apologize, database service faced an issue`
                        }
                }
                break

            case 'CastError':
                switch (error.kind) {
                    case 'ObjectId':
                        response = {
                            statusCode: HTTP_STATUS_CODE.Bad_Request,
                            statusMessage: `Invalid information provided`
                        }
                        break

                    case 'embedded':
                    case '[string]':
                    default:
                        response = CommonError.InternalServerError()
                        break
                }
                break

            case 'JsonWebTokenError':
                response = response = {
                    statusCode: HTTP_STATUS_CODE.Unauthorized,
                    statusMessage: `Please login to continue`
                }
                break

            case 'TokenExpiredError':
                response = {
                    statusCode: HTTP_STATUS_CODE.Unauthorized,
                    statusMessage: `Your session has been expired`
                }
                break

            case 'MongoNetworkError':
                response = {
                    statusCode: HTTP_STATUS_CODE.Service_Unavailable,
                    statusMessage: `We apologize, database server is unavailable`
                }
                break

            default:
                switch (error.type) {
                    case 'entity.too.large':
                        response = {
                            statusCode: HTTP_STATUS_CODE.Not_Acceptable,
                            statusMessage: `We apologize, we are unable to process large amount of data`
                        }
                        break;

                    default:
                        console.log('-------------------------error-------------------------')
                        console.log(error)
                        response = CommonError.InternalServerError()
                        break;
                }
        }

        if (error) {
            WinstonLog.error(error)
            return res.status(response.statusCode).send(response)
        }

        next()
    }

    private mongoDbErrorIdentifier(error: any) {
        let response: any

        switch (error.code) {
            case 11000:
                let errmsg: string = error.errmsg
                if (errmsg.includes('email'))
                    response = {
                        statusCode: 409,
                        statusMessage: `This email already exists`
                    }
                else
                    response = {
                        statusCode: 409,
                        statusMessage: `This information already exists`
                    }
                break

            case 28: // Path not viable
            case 2: // bad value
            default:
                response = {
                    statusCode: 503,
                    statusMessage: `We apologize, database service faced an issue`
                }
        }

        return response
    }

    private typeCastErrorIdentifier(error: any) {
        let response: any

        switch (error.kind) {
            case 'ObjectId':
                response = {
                    statusCode: HTTP_STATUS_CODE.Bad_Request,
                    statusMessage: `Invalid information provided`
                }
                break

            case 'embedded':
            case '[string]':
            default:
                response = CommonError.InternalServerError()
                break
        }

        return response
    }
}