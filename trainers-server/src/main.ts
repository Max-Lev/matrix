import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
const cors = require("cors");
const expressApp = express();
import * as functions from 'firebase-functions';
import chalk from 'chalk';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
    app.use((req, res, next) => {
      let send = res.send;
      console.log('REQUST: ', req.url);
      res.send = R => {
        console.log(`RESPONSE STATUS CODE: ${res.statusCode}`);
        console.log('RESPONSE', R);
        res.send = send;
        return res.send(R);
      }
      next();
    });

    app.use(cors({ origin: true }));
    app.enableCors({
      origin: [
        'http://localhost:4200',
        'https://express-api-bc1da.web.app/',
        'https://express-api-bc1da.firebaseapp.com/'
      ],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      allowedHeaders: 'Content-Type, Authorization',
      credentials: true,
    });

    await app.init();
    // If running locally, start the server
    if (!process.env.FUNCTIONS_EMULATOR) {
      const port = process.env.PORT ?? 3000;
      await app.listen(port);
      console.log(`🚀 Server running on http://localhost:${port}`);
    }
  } catch (error) {
    console.error('❌ Error during NestJS initialization:', error);
    functions.logger.error('NestJS initialization error:', error);
  }
}

bootstrap();

