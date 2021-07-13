import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true})
  email: string;
  @Prop({ required: true})
  password: string;
  @Prop()
  firstName: string;
  @Prop()
  lastName: string;
  @Prop()
  city: string;
  @Prop()
  birthday: Date;
  @Prop()
  registrationTime: Date;
  @Prop()
  phone: number;
  @Prop()
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
