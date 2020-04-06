import { Router } from "express";
import { LogBLL } from "../BLL/log.BLL";
import { verifyToken } from "./middlewares/token.middleware";
import { FinalResponse } from "./services/client-response.service";

export class LogPL {

    router: Router
    constructor() {
        this.router = Router()

        this.routes()
    }

    private routes() {
        this.router.post('/get-logs', verifyToken, async (req, res) => {
            let page_number: number = req.body.page_number
            let logs_per_page: number = req.body.logs_per_page

            let response = await new LogBLL().getLogs(logs_per_page, page_number)
            res.status(response.statusCode).send(FinalResponse(response))
        })
    }
}

export let LogRoutes = new LogPL().router