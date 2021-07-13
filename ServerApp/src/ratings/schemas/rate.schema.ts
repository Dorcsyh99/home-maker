import {Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/auth/interfaces/user.interface';

export type RateDocument = Rate & Document;

@Schema()
export class Rate {
    @Prop()
    star: number;
    @Prop()
    title: string;
    @Prop()
    description: string;
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    expert: User;
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    user: User;
}

export const RateSchema = SchemaFactory.createForClass(Rate);