import { ConsoleLogger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { HeroesModule } from './heroes/heroes.module';
import { ConfigurationModule } from './config/configuration.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
const chalk = require('chalk');
export class AppLogger extends ConsoleLogger {

  log(message: any, stack?: string, context?: string, error?: string) {
    super.log(message, stack, context, error)
    console.log(chalk.yellow('message:', message, 'stack:', stack, 'error:', error))
  }

}

// const mongoDbConnection = 'mongodb+srv://maxlevtov:987495Max7003388@trainers.2xaz3yk.mongodb.net/trainers?retryWrites=true&w=majority';
// const mongoDbConnection = 'mongodb://localhost:27017/trainers';

// const mongoDbConnection = 'mongodb+srv://maxlevtov:987495Max987495@cluster0.3uzbxz9.mongodb.net/trainers?retryWrites=true&w=majority';
@Module({
  imports: [
    // MongooseModule.forRoot(mongoDbConnection),
    AuthModule,
    HeroesModule,
    ConfigurationModule,
    // MongooseModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => ({
    //     uri: configService.get<string>('mongodbUri'),
    //   }),
    //   inject: [ConfigService],
    // }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      // useFactory: (configService: ConfigService) => ({
      //   uri: configService.get<string>('database.mongodbUri'),
      // }),
      useFactory: (configService: ConfigService) => {
        const uri = configService.get<string>('database.mongodbUri');
        console.log(`Connecting to MongoDB: ${uri}`);
        return { uri };
      }
    }),
  ],

  controllers: [AppController],
  providers: [
    AppLogger
  ],
})
export class AppModule {
  constructor() {

  }
}
