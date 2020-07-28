import { Document } from "mongoose";

export interface IUserModel extends Document {
    _id: string
    first_name: string
    last_name: string
    email: string
    password: string
    account_status: string
    profile_image_url: string
    last_login: Date
    account_created: Date
    gender: string
    dob: string
    role: string
}