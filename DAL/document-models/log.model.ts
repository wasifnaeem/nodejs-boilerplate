
import { Document } from "mongoose";

export interface ILogModel extends Document {
    _id: string
    request_status: string,
    time: Date
    request_url: string,
    original_data: string,
    modified_data: string,
    real_user: string
    request_made_by: string
}