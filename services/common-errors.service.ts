import { ApiResponse } from "../interfaces/response.model";
import { HTTP_STATUS_CODE } from "../enums/http-status-code.enum";

export class CommonError {

    static InternalServerError(message?: string): ApiResponse<any> {
        return {
            statusCode: HTTP_STATUS_CODE.Internal_Server_Error,
            statusMessage: !message ? `We apologize, operation could not be fulfilled` : message
        }
    }

    static InvalidEmailOrPassword(): ApiResponse<any> {
        return {
            statusCode: HTTP_STATUS_CODE.Unauthorized,
            statusMessage: `Invalid email or password provided`
        }
    }

    static InactiveAccount(): ApiResponse<any> {
        return {
            statusCode: HTTP_STATUS_CODE.Forbidden,
            statusMessage: `Please activate your account to login`
        }
    }

    static BlockedAccount(): ApiResponse<any> {
        return {
            statusCode: HTTP_STATUS_CODE.Forbidden,
            statusMessage: `Your account has been blocked`
        }
    }

    static UnAuthorized(message?: string): ApiResponse<any> {
        return {
            statusCode: HTTP_STATUS_CODE.Unauthorized,
            statusMessage: !message ? `You are not authorized to perform this operation` : message
        }
    }

    static Login(): ApiResponse<any> {
        return {
            statusCode: HTTP_STATUS_CODE.Unauthorized,
            statusMessage: `Please login to continue`
        }
    }

    static NotFound(message?: string): ApiResponse<any> {
        return {
            statusCode: HTTP_STATUS_CODE.Not_Found,
            statusMessage: !message ? 'Data not found' : message
        }
    }

}