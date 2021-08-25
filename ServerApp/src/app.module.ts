import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { HomesModule } from './homes/homes.module';
import { AuthModule } from './auth/auth.module';
import { RatesModule } from './ratings/rate.module';
import { SearchModule } from './search/search.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      dest: './files',
    }),
    HomesModule,
    AuthModule,
    RatesModule,
    SearchModule,
    MongooseModule.forRoot(
      'mongodb+srv://Admin:Admin@cluster0.fwp6n.azure.mongodb.net/home-maker?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
