import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HomeSchema } from 'src/homes/home.model';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Module({
	imports: [MongooseModule.forFeature([{ name: 'Home', schema: HomeSchema }])],
	controllers: [SearchController],
	providers: [SearchService]
})
export class SearchModule {}