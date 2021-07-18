import { Injectable } from '@nestjs/common';
import { User } from '../auth/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Rate } from './schemas/rate.schema';
import { AddRatingDto } from './dto/add-rating.dto';

@Injectable()
export class RateService{
    constructor(@InjectModel('Rate') private RateModel: Model<Rate>, @InjectModel('User') private UserModel: Model<User>) {}

    async createRating(addRatingDto: AddRatingDto, userId: number, expertId: number): Promise<Rate>{
        const rate = new this.RateModel(addRatingDto);

        //rate.user = await this.UserModel.findById(userId);
        //rate.expert = await this.UserModel.findById(expertId);

        try {
            await rate.save();
            return rate;
        } catch (error) {
            return error;
        }
    }
}