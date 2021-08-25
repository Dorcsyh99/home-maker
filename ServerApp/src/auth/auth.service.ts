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

@Injectable()
export class AuthService {
    constructor(@InjectModel('User') private userModel: Model<User>,
    private jwtService: JwtService) {}

    async signUp(authCredentials: AuthCredentialsDto): Promise<User> {
        const { firstName, lastName, email, password, role } = authCredentials;
        const id = new Types.ObjectId();
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new this.userModel({_id: id, firstName: firstName, lastName: lastName, email: email, password: hashedPassword, role: role});        

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
        const payload = {sub: user.id, email: user.email};

        return {
            accessToken: this.jwtService.sign(payload),
            expiresIn: '7200',
            userId: payload.sub,
            userName: payload.email
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
        return currentUser;
    }

    async updateProfile(id: string, updateProfileDto: UpdateProfileDto): Promise<void> {
        try {
            await this.userModel.findByIdAndUpdate(id, updateProfileDto).exec()
        } catch (error) {
            throw error;
        }
    }

    public async setAvatar(userId: string, avatarUrl: string): Promise<void>{
        console.log("User: ", userId);
        console.log("avatar: ", avatarUrl);
        await this.userModel.findByIdAndUpdate(userId, {avatar: avatarUrl}).exec();
        console.log("done upload");
    }


}