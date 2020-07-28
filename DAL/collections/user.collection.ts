import { model, Schema } from "mongoose";
import { IUserModel } from "../document-models/user.model";

const userSchema = new Schema({
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    gender: String,
    dob: Date,
    profile_image_url: String,
    account_created: Date,
    account_status: String,
    last_login: Date,
    role: { type: String, required: true },
}, { versionKey: false })

export const UserSchema = model<IUserModel>('User', userSchema)