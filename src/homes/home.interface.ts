import { Document } from 'mongoose';

export interface Home extends Document {
    city: String;
    address: String;
    size: Number;
}