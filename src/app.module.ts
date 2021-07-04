import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

import { HomesModule} from './homes/homes.module';
import { PreauthMiddleware } from './auth/preauth.middleware';
import { AuthController } from './auth/auth/auth.controller';

@Module({
  imports: [HomesModule,
  MongooseModule.forRoot("mongodb+srv://Admin:Admin@cluster0.fwp6n.azure.mongodb.net/home-maker?retryWrites=true&w=majority"),
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PreauthMiddleware).forRoutes({
      path: '*', method: RequestMethod.ALL
    });
  }
}
