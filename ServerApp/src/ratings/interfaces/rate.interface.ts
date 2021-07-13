import { Document } from 'mongoose';
import { User } from 'src/auth/interfaces/user.interface';

export interface Rate extends Document {
    readonly star: number;
    readonly title: string;
    readonly description: string;
    readonly expert: User;
    readonly user: User;
}