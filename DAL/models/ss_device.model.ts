import { Document } from "mongoose";

export interface ISSDeviceModel extends Document {
    _id: string
    name?: string
    serial_no?: string
    device_password?: string
    registration_date?: Date
    last_verification_date?: Date
    last_verification_by_user_id?: string
} 