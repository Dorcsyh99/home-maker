import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ExpertDocument = Expert & Document;

@Schema()
export class Expert {
    @Prop({required: true, unique: true})
    username: string;
    @Prop({required: true})
    password: string;
    @Prop({unique: true})
    email: string;
    @Prop({required: true})
    mainField: string;
    @Prop()
    additionalFields: string[];
}

export const ExpertSchema = SchemaFactory.createForClass(Expert); 
