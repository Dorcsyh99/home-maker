import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HomesController } from './homes.controller';
import {HomeService} from './home.service';
import { Home, HomeSchema } from './home.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
	imports: [MongooseModule.forFeatureAsync([
		{
			name: Home.name, 
			useFactory: () => {
				const schema = HomeSchema;
				schema.plugin(require('mongoose-paginate'));
				return schema;
			}
		}
	]),
			AuthModule,
		],
	controllers: [HomesController],
	providers: [HomeService]
})
export class HomesModule {}