import { Document } from 'mongoose';
import { User } from 'src/auth/interfaces/user.interface';

export interface Home extends Document {
    uploader: User;
    city: String;
    city2: String;
    address: String;
    size: Number;
    rooms: Number;
    condition: String;
    level: Number;
    levelsInBuilding: Number;
    year: Number;
    type: String;
    heating: String;
    parking: String;
    price: Number;
    elevator: Boolean;
    attic: Boolean;
    garden: Boolean;
    pet: Boolean;
    smoke: Boolean;
}