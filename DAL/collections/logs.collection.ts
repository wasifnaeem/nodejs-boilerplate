import { model, Schema } from "mongoose";
import { ILogModel } from "../document-models/log.model";

const logSchema = new Schema({
    request_status: String,
    time: { type: Date, default: Date.now },
    request_url: String,
    original_data: String,
    modified_data: String,
    real_user: { type: String, ref: 'User' },
    request_made_by: { type: String, ref: 'User' },
}, { versionKey: false })

export const LogSchema = model<ILogModel>('Log', logSchema)