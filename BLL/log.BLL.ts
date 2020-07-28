import { Request } from "express";
import { LogDAL } from "../DAL/log.DAL";
import { ILogModel } from "../DAL/document-models/log.model";
import { ApiResponse } from "../interfaces/response.model";

export class LogBLL {

    constructor() {
    }

    addLog(req: Request, user_id: string, response: ApiResponse<any>, original_data: any, modified_data?: any) {
        if (req.headers.admin_id && req.headers.admin_id.toString()) {
            let admin_id: string = req.headers.admin_id.toString();
            let request_status: string

            new LogDAL().addLog(req.url, user_id, admin_id, request_status, JSON.stringify(original_data), JSON.stringify(modified_data));
        }
    }

    async getLogs(logs_per_page?: number, page_number?: number) {
        logs_per_page = logs_per_page > 0 ? logs_per_page : 10
        page_number = page_number > 1 ? page_number : 1

        let response: ApiResponse<ILogModel[]>

        let logs = await new LogDAL().getLogs(logs_per_page, page_number)

        if (logs && logs.length) {
            response = {
                statusCode: 200,
                data: logs
            }
        }
        else {
            response = {
                statusCode: 404,
                statusMessage: `No Logs Found`
            }
        }

        return response
    }
}