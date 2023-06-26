import { NestFactory } from '@nestjs/core';
import { AppModule, AppLogger } from './app.module';

const chalk = require('chalk');
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: new AppLogger(),
  });

  app.use((req, res, next) => {
    let send = res.send;
    console.log(chalk.yellow('REQUST: ', req.url))
    res.send = R => {
      console.log(chalk.green(`RESPONSE STATUS CODE: ${res.statusCode}`));
      console.log(chalk.blue('RESPONSE', R));
      res.send = send;

      return res.send(R);
    }
    next();
  });


  await app.listen(3000);
}
bootstrap();

