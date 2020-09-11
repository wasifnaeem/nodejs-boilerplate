import express from "express";
import { AccountBLL } from "../BLL/account.BLL";
import { IUserModel } from "../DAL/document-models/user.model";
import { HTTP_STATUS_CODE } from "../enums/http-status-code.enum";
import { ILogin } from "../interfaces/login.model";
import { ApiResponse } from "../interfaces/response.model";
import { verifyApiKey } from "./middlewares/api-key.middleware";
import { verifyUserRole } from "./middlewares/role-verify.middleware";
import { verifyToken } from "./middlewares/token.middleware";
import { EmailService } from "./services/email.service";

class AccountPL {

    router: express.Router
    constructor() {
        this.router = express.Router()

        // initializing routes
        this.routes()
    }

    routes() {
        this.router.post('/send-account-activation-email', verifyApiKey, async (req, res) => {
            let email: string = req.body.email
            let response = await new AccountBLL().sendAccountActivationEmail(email)
            res.status(response.statusCode).send(response)
        })

        this.router.post('/login', verifyApiKey, async (req, res) => {
            const login: ILogin = {
                email: req.body.email,
                password: req.body.password
            }

            let response: ApiResponse<any>
            response = await new AccountBLL().Login(login)
            res.status(response.statusCode).send(response)
        })

        this.router.post('/signup', verifyApiKey, verifyUserRole, async (req, res, next) => {
            // getting user selected role
            let role: string = req.headers.role.toString()
            req.body.role = role

            let response: ApiResponse<IUserModel>
            response = await new AccountBLL().signup(req.body)

            if (response.statusCode == HTTP_STATUS_CODE.Created) {
                let user: IUserModel = response.data
                new EmailService().sendAccountVerificationMail(user)
            }

            let user = response.data

            user.password = undefined
            user.account_created = undefined

            res.status(response.statusCode).send(response)
        })

        this.router.post('/activate-account', verifyToken, async (req, res) => {
            let _id: string = req.headers._id.toString()
            let role: string = req.headers.role.toString()

            let response = await new AccountBLL().activateAccount(_id)
            res.status(response.statusCode).send(response)
        })

        this.router.post('/send-password-recovery-email', async (req, res) => {
            let email: string = req.body.email.toString()

            let response = await new AccountBLL().sendPasswordRecoveryEmail(email)
            res.status(response.statusCode).send(response)
        })

        this.router.post('/recover-password', verifyToken, async (req, res) => {
            let user_id: string = req.headers._id.toString()
            let role: string = req.headers.role.toString()
            let password: string = req.body.password

            let response = await new AccountBLL().recoverPassword(user_id, password)
            res.status(response.statusCode).send(response)
        })

        this.router.post('/change-account-status', verifyToken, async (req, res) => {
            let sender_id: string = req.headers._id.toString()
            let user_id: string = req.body._id
            let account_status: string = req.body.account_status

            let response = await new AccountBLL().updateAccountStatus(user_id, account_status)
            res.status(response.statusCode).send(response)
        })

        this.router.post('/delete-account', verifyToken, async (req, res) => {
            let sender_id: string = req.headers._id.toString()
            let _id: string = req.body._id

            let response = await new AccountBLL().deleteAccount(_id)
            res.status(response.statusCode).send(response)
        })
    }
}

export let AccountRoutes = new AccountPL().router