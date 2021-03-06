import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model, Types } from 'mongoose';

import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { User } from './interfaces/user.interface';
import { MongoError } from 'mongodb';
import { AuthLogintDto } from './dto/user-login.dto';

var ObjectID = require('mongodb').ObjectID;

@Injectable()
export class AuthService {
    constructor(@InjectModel('User') private userModel: Model<User>,
    private jwtService: JwtService) {}

    async signUp(authCredentials: AuthCredentialsDto): Promise<User> {
        const { firstName, lastName, email, password, role } = authCredentials;
        const id = new Types.ObjectId();
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new this.userModel({_id: id, firstName: firstName, lastName: lastName, email: email, password: hashedPassword});        

        try {
            return await user.save();            
        } catch (error) {
            if (error.code === 11000){
                return error({message: "User already exists"});
            }
            throw error;
        }
    }

    async signIn(authLoginDto: AuthLogintDto) {
        const user = await this.validateUser(authLoginDto);
        const payload = {sub: user.id, email: user.email, avatar: user.avatar, firstName: user.firstName, lastName: user.lastName, };

        return {
            accessToken: this.jwtService.sign(payload),
            expiresIn: '7200',
            userId: payload.sub,
            userName: payload.email,
            userAvatar: payload.avatar,
            userFirstName: payload.firstName,
            userLastName: payload.lastName
        };
    }



    async validateUser(authLoginDto: AuthLogintDto): Promise<User> {
        const {email, password} = authLoginDto;
        const user = await this.userModel.findOne({email});
        if(!user) {
            return null;
        }

        const valid = await bcrypt.compare(password, user.password);

        if(valid) {
            return user;
        }
        return null;
    }

    async getCurrentUser(email: string): Promise<User> {
        const currentUser = await this.userModel.findOne({ email }).exec();
        console.log("Current user: ", currentUser);
        return currentUser;
    }

    async findOne(id: string): Promise<User> {
        const user = await this.userModel.findById(ObjectID(id)).exec();
        console.log(user);
        return user;
      }

    async updateProfile(id: string, updateQuery: UpdateProfileDto): Promise<void> {
        console.log("el??rt??nk ide! updateProfile. Update query: ", id, updateQuery);
        try {
            await this.userModel.updateOne({_id: ObjectID(id)}, {$set: {$inc: {updatedHomeCount: 1}, $push: {updatedHomes: updateQuery.uploadedHomes}}}, {new: false, useFindAndModify: true});;
            console.log("update doneee");
        } catch (error) {
            console.log("error during updateprofile");
            throw error;
        }
    }

    async setAvatar(userId: string, avatarUrl: string): Promise<void>{
        console.log("User: ", userId);
        console.log("avatar: ", avatarUrl);
        try {
            await this.userModel.updateOne({_id: ObjectID(userId)}, {$set: {avatar: avatarUrl}}, {new: true, useFindAndModify: true});
            console.log("done something here");
        } catch (error) {
            throw error;
        }
        console.log("done upload");
    }

    /*async fetchAvatar(avatarId: string): Promise<any>{
        const user = await this.userModel.findOne({_id: ObjectID(id)}).exec();
        const avatarFilePath = user.avatar;
        console.log("user: ", user);
        console.log("avatar: ", avatarFilePath);
        return avatarFilePath;
    }*/


}