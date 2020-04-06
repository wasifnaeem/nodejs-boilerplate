import { AccountDAL } from "../DAL/account.DAL";
import { IUserModel } from "../DAL/models/user.model";
import { ACCOUNT_STATUS } from "../enums/account-status.enum";
import { HTTP_STATUS_CODE } from "../enums/http-status-code.enum";
import { USER_ROLE } from "../enums/roles.enum";
import { ILogin } from "../interfaces/login.model";
import { ApiResponse } from "../interfaces/response.model";
import { IEmailResponse } from "../PL/models/email.model";
import { EmailService } from "../PL/services/email.service";
import { CommonError } from "../services/common-errors.service";
import { Password } from "./services/password.service";
import { Token } from "./services/token.service";

export class AccountBLL {

    constructor() {
    }

    async Login(login: ILogin): Promise<ApiResponse<IUserModel>> {
        let user = await new AccountDAL().login(login.email)

        let response: ApiResponse<IUserModel>
        if (!user)
            response = CommonError.InvalidEmailOrPassword()
        else if (user.account_status != ACCOUNT_STATUS.active) {
            if (user.account_status == ACCOUNT_STATUS.blocked) {
                response = CommonError.BlockedAccount()
            }
            else if (user.account_status == ACCOUNT_STATUS.inactive) {
                response = CommonError.InactiveAccount()
            }
            else {
                response = CommonError.InternalServerError()
            }
        }
        else {
            let isPasswordValid: boolean = await new Password().isValid(login.password, user.password)
            if (!isPasswordValid) {
                response = CommonError.InvalidEmailOrPassword()
            }
            else {
                user.password = undefined
                user.account_status = undefined
                response = {
                    data: user,
                    statusCode: 200,
                    statusMessage: `You have succesfully logged in`,
                    role: USER_ROLE[user.role],
                    token: new Token().create(user._id, user.role)
                }

                response.data.role = undefined
            }
        }

        return response
    }

    async sendAccountActivationEmail(email: string): Promise<ApiResponse<any>> {
        let response: ApiResponse<IEmailResponse>

        let user = await new AccountDAL().getUserByEmail(email)

        if (user) {
            await new EmailService().sendAccountVerificationMail(user)
            response = {
                statusMessage: 'Account activation email has been sent to you.\n Please check spam folder if not received',
                statusCode: 200
            }
        }
        else {
            response = {
                statusMessage: `Email not found`,
                statusCode: HTTP_STATUS_CODE.Not_Found
            }
        }

        return response
    }

    async signup(user: IUserModel): Promise<ApiResponse<IUserModel>> {
        let response: ApiResponse<IUserModel>

        return response
    }

    async activateAccount(user_id: string): Promise<ApiResponse<any>> {
        let response: ApiResponse<any>
        let user: IUserModel = await new AccountDAL().activateAccount(user_id)

        if (user && user.account_status == ACCOUNT_STATUS.active)
            response = {
                statusCode: 200,
                statusMessage: `Congratulations ${user.first_name} ${user.last_name}, your account has been activated succesfully`,
            }
        else
            response = {
                statusCode: 500,
                statusMessage: `Failed to activate your account`
            }

        return response
    }

    async sendPasswordRecoveryEmail(email: string): Promise<ApiResponse<IUserModel>> {
        let response: ApiResponse<IUserModel>
        let user: IUserModel

        user = await new AccountDAL().getUserByEmail(email)

        if (!user)
            response = CommonError.NotFound(`Username does not exist`)
        else {
            new EmailService().sendPasswordRecoveryMail(user)

            response = {
                statusCode: 200,
                statusMessage: 'Password recovery email has been sent to you'
            }
        }

        return response
    }

    async recoverPassword(_id: string, password: string): Promise<ApiResponse<IUserModel>> {
        let response: ApiResponse<IUserModel>
        let user: IUserModel
        let encryptedPassword = await new Password().encrypt(password)

        user = await new AccountDAL().recoverPassword(_id, encryptedPassword)

        if (!user)
            response = CommonError.InternalServerError()
        else
            response = {
                statusCode: 200,
                statusMessage: `Password has been changed successfully`
            }

        return response
    }

    async updateAccountStatus(user_id: string, account_status: string) {
        let response: ApiResponse<IUserModel>
        let data = await new AccountDAL().updateAccountStatus(user_id, account_status)

        if (data) {
            response = {
                statusCode: 200,
                statusMessage: `Account status has been updated`,
                data: data
            }
        }
        else {
            response = {
                statusCode: 404,
                statusMessage: `Account not found`
            }
        }

        return response
    }

    async deleteAccount(_id: string): Promise<ApiResponse<any>> {
        let response: ApiResponse<any>

        return response
    }
}