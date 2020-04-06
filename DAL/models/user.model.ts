import { Document } from "mongoose";
import { ACCOUNT_STATUS } from "../../enums/common.enum";
import { SESSION_ACCESS_STATUS } from "../../enums/player.enum";
import { NOTIFICATION_STATUS, NOTIFICATION_TYPE } from "../../interfaces/notification.model";
import { IPlayerModel } from "./player.model";

export interface IUserModel extends Document {
    _id: string
    email?: string
    password?: string
    old_password: string
    first_name?: string
    last_name?: string
    gender?: string
    dob?: string
    profile_image_url?: string
    account_created?: Date
    account_status?: ACCOUNT_STATUS
    last_login?: Date
    height?: {
        value: number
        metric_unit: string
    }
    weight?: {
        value: number
        metric_unit: string
    }
    address?: {
        country: string
        city: string
        latitude?: number
        longitude?: number
    }
    role?: string
    club_or_team?: string
    bowling?: {
        style: string
        arm: string
    }
    connections?: Array<{
        _id?: string
        first_name?: string
        last_name?: string
        email?: string
        profile_image_url?: string
        address?: {
            country: string
            city: string
        }
        bowling?: {
            arm: string,
            style: string
        },
        connection_status: string
    }>
    sessions?: Array<{
        _id: string
        id?: string
        session_name: string
        start_time: Date
        access_status: SESSION_ACCESS_STATUS
        disconnect_cause?: string
        balls: Array<{
            _id: string
            id?: string
            bowled_on_time: Date
            action_duration: number
            tilt_angle: number
            elbow_extension: number
            arm_speed: number
            raw_data: string
        }>
    }>
    sessions_avg?: {
        action_duration: number
        tilt_angle: number
        elbow_extension: number
        arm_speed: number
    }
    player?: IPlayerModel
    // shared_feeds?: Array<IFeedModel>
    // liked_feeds?: Array<IFeedModel>
    notifications?: Array<{
        _id?: string // date and time are already embedded in _id property
        sender_id?: string
        notification_type: NOTIFICATION_TYPE
        notification_status?: NOTIFICATION_STATUS
        message?: string
    }>
    experience?: {
        no_of_years: number
        coaching_level: string
    }
}