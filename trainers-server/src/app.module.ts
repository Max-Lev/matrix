import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { HeroesModule } from './heroes/heroes.module';

// console.log("MongoDB URI:", process.env.FIREBASE_CONFIG_mongodb_uri || process.env.MONGODB_URI);
@Module({
  imports: [
    
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'production' ? '.env' : '.env.local',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    AuthModule,
    HeroesModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
