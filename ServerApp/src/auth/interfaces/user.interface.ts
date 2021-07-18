import { Document, Types } from 'mongoose';

export interface User extends Document {
    readonly _id: Types.ObjectId;
    readonly email: string;
    readonly password: string;
    readonly role: string;
}