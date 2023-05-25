import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { LazyModuleLoader } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { HeroesModule } from './heroes/heroes.module';
import { AuthModule2 } from './auth2.0/auth2.module';

const mongoDbConnection = 'mongodb+srv://maxlevtov:987495Max@trainers.2xaz3yk.mongodb.net/trainers?retryWrites=true&w=majority';
@Module({
  imports: [
    MongooseModule.forRoot(mongoDbConnection),
    UsersModule,
    // AuthModule,
    HeroesModule,
    // MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]),
    AuthModule,
    // StudentsModule
    // AuthModule2
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(public lazyModuleLoader: LazyModuleLoader) {
    console.log('AppModule')
  }
  

}
