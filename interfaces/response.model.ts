import { USER_ROLE } from "../enums/roles.enum";

export interface ApiResponse<T> {
    statusCode: number
    statusMessage?: string
    role?: USER_ROLE
    data?: T
    token?: string
}