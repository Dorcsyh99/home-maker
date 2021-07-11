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
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from './interfaces/user.interface';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    async signUpAsUser(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return await this.authService.signUp(authCredentialsDto);
    }

    @Post('/signupexp')
    async signUpAsExpert(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return await this.authService.signUp(authCredentialsDto);
    }
 
    @Post('/signin')
    async signIn(@Req() req: User) {
        return this.authService.signIn(req);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/me')
    getMe(@Request() req) {
      return req.user;
    }

    @UseGuards(JwtAuthGuard)
    @Patch('/update/:id')
    async updateProfile(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
        return await this.authService.updateProfile(id, updateProfileDto)
    }
}