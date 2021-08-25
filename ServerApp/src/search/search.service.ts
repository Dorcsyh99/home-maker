import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model, Types } from 'mongoose';


import { MongoError } from 'mongodb';
import { Home, HomeDocument } from 'src/homes/home.model';
import { Observable } from 'rxjs';

@Injectable()
export class SearchService {

    constructor(@InjectModel(Home.name) private homeModel: Model<HomeDocument>){}

    async findByCity(city: string): Promise<Home[]>{
        return this.homeModel.find({city: city}).exec();
    }

    async featuredHomes(): Promise<Home[]>{
        return this.homeModel.find({featured: true}).exec();
    }
}