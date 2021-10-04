import {Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/auth/interfaces/user.interface';
import mongoosePaginate from 'mongoose-paginate';

export type HomeDocument = Home & Document;

@Schema()
export class Home {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  uploader: User;
  @Prop()
  featured: boolean;
  @Prop()
  city: string;
  @Prop()
  city2: string;
  @Prop()
  address: string;
  @Prop()
  size: number;
  @Prop()
  rooms: number;
  @Prop()
  condition: string;
  @Prop()
  year: number;
  @Prop()
  level: number;
  @Prop()
  levelsInBuilding: number;
  @Prop()
  elevator: boolean;
  @Prop()
  garden: boolean;
  @Prop()
  attic: boolean;
  @Prop()
  heating: string;
  @Prop()
  type: string;
  @Prop()
  parking: string;
  @Prop()
  price: string;
  @Prop()
  pet: boolean;
  @Prop()
  smoke: boolean;
}

<<<<<<< HEAD


export const HomeSchema = SchemaFactory.createForClass(Home);
=======
export const HomeSchema = SchemaFactory.createForClass(Home);




>>>>>>> f44eda739c149f2b5cd7cbcf90540cce07120aa6
