import { model, Schema } from "mongoose";
import { IUserModel } from "../models/user.model";

const userSchema = new Schema({
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    old_password: String,
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    gender: String,
    dob: Date,
    profile_image_url: String,
    account_created: Date,
    account_status: String,
    last_login: Date,
    height: {
        value: Number,
        metric_unit: String,
    },
    weight: {
        value: Number,
        metric_unit: String,
    },
    address: { // as location is reserved word thus address is used
        country: String,
        city: String,
        latitude: Number,
        longitude: Number,
    },
    bowling: {
        style: String,
        arm: String,
    },
    role: { type: String, required: true },
    experience: {
        no_of_years: Number,
        coaching_level: String,
    },
    connections: [{
        _id: String,
        first_name: String, // this is not for db
        last_name: String, // this is not for db
        email: String, // not for database
        profile_image_url: String, // this is not for db
        address: { // this is not for db
            country: String,
            city: String
        },
        bowling: {
            arm: String,  // not for database
            style: String  // not for database
        },
        connection_status: String,
    }],
    club_or_team: String,
    sessions: [{
        id: String, // this is only for sync purpose, short time db storage
        session_name: String,
        start_time: Date,
        access_status: String,
        disconnect_cause: String,
        balls: [{
            id: String, // this is only for sync purpose, short time db storage
            bowled_on_time: Date,
            action_duration: Number,
            tilt_angle: Number,
            elbow_extension: Number,
            arm_speed: Number,
            raw_data: String
        }]
    }],
    sessions_avg: { // not for db
        action_duration: Number,
        tilt_angle: Number,
        elbow_extension: Number,
        arm_speed: Number
    },
    // shared_feeds: [{ type: ObjectId, ref: 'Feed' }],
    // liked_feeds: [{ type: ObjectId, ref: 'Feed' }],
    player: { type: String, ref: 'Player' },
    notifications: [{
        sender_id: String,
        notification_type: String, // as type is a reserved word for mongodb
        notification_status: String, // as status is a reserved word for mongodb
        message: String
    }]
}, { versionKey: false })

export const UserSchema = model<IUserModel>('User', userSchema)