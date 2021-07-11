import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ExpertDocument = Expert & Document;

@Schema()
export class Expert {
    @Prop({required: true, unique: true})
    email: string;
    @Prop({required: true})
    password: string;
    @Prop()
    mainField: string;
    @Prop()
    additionalFields: string[];
    @Prop()
    firstName: string;
    @Prop()
    lastName: string;
    @Prop()
    city: string;
    @Prop()
    phone: number;
    @Prop()
    birthday: Date;
    @Prop()
    registrationTime: Date;
    @Prop()
    role: string;
}

export const ExpertSchema = SchemaFactory.createForClass(Expert); 
