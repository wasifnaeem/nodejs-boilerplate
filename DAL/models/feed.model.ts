import { Document } from "mongoose";
import { FEED_SHARING_LEVEL } from "../../enums/player.enum";
import { IUserModel } from "./user.model";

export interface IFeedModel extends Document {
    _id: string
    feed_image_url?: string
    isFeedLikedByYou: boolean,
    shared?: {
        sharing_level: FEED_SHARING_LEVEL
        users: Array<{
            user_id: string
            user_role: string
        }>
    }
    player?: {
        _id: string
    }
    liked_by?: Array<IUserModel>
    // user: IUserModel,
    no_of_likes?: number
}