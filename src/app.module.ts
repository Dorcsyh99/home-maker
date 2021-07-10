import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { HomesModule } from './homes/homes.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    HomesModule,
    AuthModule,
    MongooseModule.forRoot(
      'mongodb+srv://Admin:Admin@cluster0.fwp6n.azure.mongodb.net/home-maker?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
