import { Document, Types } from 'mongoose';

export interface User extends Document {
    readonly _id: Types.ObjectId;
    readonly email: string;
    readonly password: string;
    readonly role: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly phone: number;
    readonly city: string;
    readonly avatar: string; 
}