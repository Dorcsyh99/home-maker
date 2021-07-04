import {Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, } from 'mongoose';

export type HomeDocument = Home & Document;

@Schema()
export class Home {
  @Prop()
  city: string;
  @Prop()
  address: string;
  @Prop()
  size: number;
}

export const HomeSchema = SchemaFactory.createForClass(Home);

