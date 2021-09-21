import { Body,
    Controller,
    Post,
    Get,
    Request,
    UseGuards,
    ValidationPipe,
    Patch,
    Req,
    Param,
    UseInterceptors,
    UploadedFile,
    Put, 
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AuthLogintDto } from './dto/user-login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from './interfaces/user.interface';
import { MulterModule } from '@nestjs/platform-express';
import {diskStorage} from 'multer';
import moment from 'moment';

@Controller('api/auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    async signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<User> {
        return await this.authService.signUp(authCredentialsDto);
    }
 
    @Post('/signin')
    async signIn(@Body() authLoginDto: AuthLogintDto) {
        return this.authService.signIn(authLoginDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/me')
    getMe(@Request() req) {
        return req.user;
    }

    @UseGuards(JwtAuthGuard)
    @Patch('/update/:id')
    async updateProfile(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto): Promise<User> {
        return await this.authService.updateProfile(id, updateProfileDto)
    }

    @Put('/avatar/:id')
    @UseInterceptors(
        FileInterceptor('file',
        {
            storage: diskStorage({
                destination: './images',
                filename: (req, file, cb) => {
                    const string = "valamirandomfaszsag";
                    const shortName = file.originalname.split('.');
                    return cb(null, `${(shortName[0])}${"_"}${string}${".jpg"}`);
                    }
                })
        }))
    async uploadAvatar(@Param('id') userId: string, @UploadedFile() file){
        console.log(file);
        const filePath = file.path;
        console.log(filePath);
        return await this.authService.setAvatar(userId, file.path);
    }
    

}