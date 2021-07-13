import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class AuthService {
    constructor(@InjectModel('User') private userModel: Model<User>,
    private jwtService: JwtService) {}

    async signUp(authCredentials: AuthCredentialsDto): Promise<void> {
        const { email, password, role } = authCredentials;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new this.userModel({email, password: hashedPassword, role});        

        try {
            await user.save();
        } catch (error) {
            if (error.code == 11000) {
                throw new ConflictException('User already exists');
            }
            throw error;
        }
    }

    async signIn(user: User) {
        const payload = {email: user.email, sub: user._id};
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }



    async validateUser(email: string, pass: string): Promise<User> {
        const user = await this.userModel.findOne({ email }).exec();

        if(!user) {
            //bovebb hibakezeles kell
            return null;
        }

        const valid = await bcrypt.compare(pass, user.password);

        if(valid) {
            return user;
        }
        return null;
    }

    async getCurrentUser(email: string): Promise<User> {
        const currentUser = await this.userModel.findOne({ email }).exec();
        console.log('done');
        return currentUser;
    }

    async updateProfile(id: string, updateProfileDto: UpdateProfileDto): Promise<void> {
        try {
            await this.userModel.findByIdAndUpdate(id, updateProfileDto).exec()
        } catch (error) {
            throw error;
        }
    }


}