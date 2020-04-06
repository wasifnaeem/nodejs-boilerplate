import { Document } from "mongoose";

export interface ILogModel extends Document {
    _id: string
    time: Date
    real_user: string
    request_status: string
    original_data: string
    modified_data: string
    request_url: string
    request_made_by: string
}