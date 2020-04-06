import { Document } from "mongoose";

export interface IFaqModel extends Document {
    _id: string
    question: string
    answer: string
}