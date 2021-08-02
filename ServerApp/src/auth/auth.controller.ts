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
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AuthLogintDto } from './dto/user-login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from './interfaces/user.interface';

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
        console.log(req);
        return req.user;
    }

    @UseGuards(JwtAuthGuard)
    @Patch('/update/:id')
    async updateProfile(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
        return await this.authService.updateProfile(id, updateProfileDto)
    }
}