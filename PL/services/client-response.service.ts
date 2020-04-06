import { ApiResponse, ISendResponse } from "../../interfaces/response.model";

export function FinalResponse(response: ApiResponse<any>): ISendResponse {
    let sendResponse: ISendResponse = {
        status: response.statusCode,
        message: response.statusMessage,
        response: {
            data: response.data,
            role: response.role,
            token: response.token
        }
    }

    if (response.statusCode != 200 && response.statusCode != 201) {
        sendResponse.response = undefined
    }

    return sendResponse
}