import jsonwebtoken from "jsonwebtoken";
import { Request } from "express";
import { environment } from "../../environment/environment";

export interface ITokenPayload {
    _id: string
    role: string
    iat?: number
    exp?: number
}

export class Token {

    constructor() {

    }

    create(_id: string, role: string, expiryTime?: string | number): string {
        let payLoad: ITokenPayload = {
            _id: _id,
            role: role
        }

        if (!expiryTime)
            return jsonwebtoken.sign(payLoad, environment.TOKEN_SECRET_KEY)

        return jsonwebtoken.sign(payLoad, environment.TOKEN_SECRET_KEY, {
            expiresIn: expiryTime
        })
    }

    verify(request: Request): ITokenPayload {
        let token = request.headers.token.toString()
        return jsonwebtoken.verify(token, environment.TOKEN_SECRET_KEY) as ITokenPayload
    }

}