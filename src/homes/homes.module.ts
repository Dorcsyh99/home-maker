import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HomesController } from './homes.controller';
import {HomeService} from './home.service';
import { Home, HomeSchema } from './home.model';

@Module({
	imports: [MongooseModule.forFeature([{name: Home.name, schema: HomeSchema}])],
	controllers: [HomesController],
	providers: [HomeService]
})
export class HomesModule {}