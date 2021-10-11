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
    Res, 
    Response,
    StreamableFile
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
import path, { join, parse } from 'path';
import {v1 as uuidv1} from 'uuid';
import { createReadStream } from 'fs';

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
    @Get(':id')
    async find(@Param('id') id: string){
        console.log(id);
        return await this.authService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('/update/:id')
    async updateProfile(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto): Promise<void> {
        await this.authService.updateProfile(id, updateProfileDto)
    }

    @Get('/avatar/:id')
    async fetchAvatar(@Param('id') avatarId: string, @Response({passthrough: true}) res): Promise<StreamableFile> {
        console.log("avatarId: ", avatarId);
        const path = process.cwd() + "\\images\\" + avatarId;
        console.log(path);
        const data = createReadStream(path);
        res.set({
            'Content-Type': 'image/jpg'
        })
        return new StreamableFile(data);
    }

    @Post('/avatar/:id')
    @UseInterceptors(
        FileInterceptor('file',
        {
            storage: diskStorage({
                destination: './images',
                filename: (req, file, cb) => {
                  const filename: string = parse(file.originalname).name + uuidv1();
                  const extension: string = parse(file.originalname).ext;
                  
                  cb(null, `/${filename}${extension}`);
            }})
        }))
    async uploadAvatar(@Param('id') userId: string, @UploadedFile() file){
        console.log(file);
        const filePath = file.filename;
        console.log(filePath);
        return await this.authService.setAvatar(userId, filePath);
    }
    

}