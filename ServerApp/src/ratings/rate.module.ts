import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/auth/schemas/user.schema';
import { RateController } from './rates.controller';
import { RateService } from './rates.service';

@Module({
	imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
	controllers: [RateController],
	providers: [RateService]
})
export class RatesModule {}