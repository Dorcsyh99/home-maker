import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post()
    async login(@Body() loginUserDto: CreateUserDto){
        return await this.authService.validateUserByPassword(loginUserDto);
    }
}