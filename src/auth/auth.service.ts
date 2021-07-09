import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserService } from '../users/user.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {}

    async validateUserByPassword(loginAttempt: CreateUserDto) {
        let userToAttempt = await this.userService.findOneByEmail(loginAttempt.email);

        return new Promise((resolve) => {
            userToAttempt.checkPassword(loginAttempt.password, (err, isMatch) => {

                if(err) throw new UnauthorizedException();

                if(isMatch) {
                    resolve(this.createdJwtPayload(userToAttempt));
                } else {
                    throw new UnauthorizedException();
                }
            });
        });
    } 

    async validateUserByJwt(payload: JwtPayload) {
        let user = await this.userService.findOneByEmail(payload.email);

        if(user){
            return this.createdJwtPayload(user);
        } else {
            throw new UnauthorizedException();
        }
    }

    createdJwtPayload(user){
        let data: JwtPayload = {
            email: user.email
        };

        let jwt = this.jwtService.sign(data);

        return {
            expiresIn: 3600,
            token: jwt
        }
    }
}