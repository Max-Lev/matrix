import { LazyModuleLoader, NestFactory } from '@nestjs/core';
import { AppModule, MyLogger } from './app.module';
import { ConsoleLogger } from '@nestjs/common/services';

// const LazyModuleLoader = require('@nestjs/core')

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    // logger: ['debug','error','log','warn']
    logger: new MyLogger(),
  });
  await app.listen(3000);
}
bootstrap();

