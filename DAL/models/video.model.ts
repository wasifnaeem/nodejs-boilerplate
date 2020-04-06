import { Document } from "mongoose";

export interface IVideoModel extends Document {
    _id: string
    title: string
    description: string
    thumbnail_url: string
    video_url: string
    video_for_role: string
}