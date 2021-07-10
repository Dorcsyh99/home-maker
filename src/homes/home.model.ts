import {Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/auth/interfaces/user.interface';

export type HomeDocument = Home & Document;

@Schema()
export class Home {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  uploader: User;
  @Prop()
  city: string;
  @Prop()
  address: string;
  @Prop()
  size: number;
}

export const HomeSchema = SchemaFactory.createForClass(Home);