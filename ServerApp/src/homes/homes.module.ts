import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HomesController } from './homes.controller';
import {HomeService} from './home.service';
import { Home, HomeSchema } from './home.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
	imports: [MongooseModule.forFeature([{name: Home.name, schema: HomeSchema}]),
			AuthModule,
		],
	controllers: [HomesController],
	providers: [HomeService]
})
export class HomesModule {}