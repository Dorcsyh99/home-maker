import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({required: true})
  _id: Types.ObjectId;
  @Prop({required: true})
  role: string;
  @Prop({ required: true})
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
  mainField: string;
  @Prop()
  avatar: string;
  @Prop()
  updatedHomeCount: number;
  @Prop()
  updatedHomes: Types.ObjectId[];
  @Prop()
  savedHome: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
