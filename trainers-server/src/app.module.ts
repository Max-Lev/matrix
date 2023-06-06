import { ConsoleLogger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { LazyModuleLoader } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { HeroesModule } from './heroes/heroes.module';
import { AuthModule2 } from './auth2.0/auth2.module';

export class MyLogger extends ConsoleLogger {
  error(message: any, stack?: string, context?: string) {
    console.log('error', message, stack, context)
    super.error(arguments);
  }

  log(message: any, stack?: string, context?: string, error?: string) {
    super.log(message, stack, context)
    console.log('logger - ', 'message:', message, 'stack:', stack,
      'error:', error,
      'context:', context)
  }

}

const mongoDbConnection = 'mongodb+srv://maxlevtov:987495Max@trainers.2xaz3yk.mongodb.net/trainers?retryWrites=true&w=majority';
@Module({
  imports: [
    MongooseModule.forRoot(mongoDbConnection),
    HeroesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    MyLogger
  ],
})
export class AppModule {
  constructor(public lazyModuleLoader: LazyModuleLoader) {

  }
}
