import { Document } from "mongoose";
import { ACCOUNT_STATUS } from "../../enums/common.enum";
import { NOTIFICATION_TYPE, NOTIFICATION_STATUS } from "../../interfaces/notification.model";

export interface ICoachModel extends Document {
    _id: string
    email: string
    password: string
    first_name: string
    last_name: string
    gender: string
    dob: string
    profile_image_url: string
    account_created: Date
    account_status: ACCOUNT_STATUS
    last_login: Date
    height: {
        value: number
        metric_unit: string
    }
    weight: {
        value: number
        metric_unit: string
    }
    address: {
        country: string
        city: string
        latitude?: number
        longitude?: number
    }
    experience: {
        no_of_years: number
        coaching_level: string
    }
    connections: Array<{
        _id: string
        first_name?: string
        last_name?: string
        email?: string
        profile_image_url?: string
        address?: {
            country: string
            city: string
        }
        bowling?: {
            arm: string
            style: string
        }
        connection_status: string
    }>
    club_or_team: string
    liked_feeds: Array<{
        _id?: string
        feed_id: string
    }>,
    notifications: Array<{
        _id?: string // date and time are already embedded in _id property
        sender_id?: string
        notification_type: NOTIFICATION_TYPE
        notification_status?: NOTIFICATION_STATUS
        message?: string
    }>
}