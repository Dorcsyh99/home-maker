import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model, Types } from 'mongoose';


import { MongoError } from 'mongodb';
import { Home, HomeDocument } from 'src/homes/home.model';
import { Observable } from 'rxjs';
import { HomeQuery, MainPageFormData } from './search.data.dto';

var ObjectID = require('mongodb').ObjectID;

@Injectable()
export class SearchService {

    constructor(@InjectModel(Home.name) private homeModel: Model<HomeDocument>){}
    
    setQueryMinMax(){
        
    }

    async findByCity(city: string): Promise<Home[]>{
        return this.homeModel.find({city: city}).exec();
    }

    async findByQuery(query: MainPageFormData): Promise<Home[]>{
        return this.homeModel.find({query}).exec();
    }

    async findHomesByUploader(userId: string): Promise<Home[]>{
        return this.homeModel.find({uploader: ObjectID(userId)});
    }

    async featuredHomes(): Promise<Home[]>{
        return this.homeModel.find({featured: true}).exec();
    }
}