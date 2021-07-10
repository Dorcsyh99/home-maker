import { Document } from 'mongoose';
import { User } from 'src/auth/interfaces/user.interface';

export interface Home extends Document {
    uploader: User;
    city: String;
    address: String;
    size: Number;
}