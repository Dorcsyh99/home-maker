import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { UsersController } from './user.controller';
import { UserService} from './user.service';
import { UserSchema } from './user.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'user', schema: usersSchema}]),
        PassportModule.register({ defaultStrategy: 'jwt', session: false})
    ],
    exports: [UserService],
    controllers: [UsersController],
    providers: [UserService]
})
export class UsersModule {}