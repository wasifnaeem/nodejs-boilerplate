import { Document } from "mongoose";

export interface IAddressModel extends Document {
    _id: string
    country: string
    cities: Array<string>
}