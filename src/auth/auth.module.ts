import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from '../users/user.module';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [
        PassportModule.resgister({ defaultStrategy: 'jwt', session: false }),
        JwtModule.register({
            secretOrPrivateKey: 'thisisaverygoodsecretkey',
            signOptions: {
                expiresIn: 3600
            }
        }),
        UsersModule
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy]
})
export class AuthModule {}