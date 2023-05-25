import { LazyModuleLoader,NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// const LazyModuleLoader = require('@nestjs/core')

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(3000);
}
bootstrap();
