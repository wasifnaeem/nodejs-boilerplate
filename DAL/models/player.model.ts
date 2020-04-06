import { Document } from "mongoose";
import { SESSION_ACCESS_STATUS } from "../../enums/player.enum";

export interface IPlayerModel extends Document {
    _id: string
    club_or_team: string
    bowling: {
        style: string
        arm: string
    }
    sessions: Array<{
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
}