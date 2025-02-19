
// import { NestFactory } from '@nestjs/core';
// import { ExpressAdapter } from '@nestjs/platform-express';
// import { AppModule } from './app.module';
// import * as express from 'express';
// import * as functions from 'firebase-functions';

// const server = express();

// export const createNestServer = async (expressInstance) => {
//     const app = await NestFactory.create(
//         AppModule,
//         new ExpressAdapter(expressInstance),
//     );

//     return app.init();
// };



// createNestServer(server)
//     .then(v => console.log('Nest Ready'))
//     .catch(err => console.error('Nest broken', err));

// export const api = functions.https.onRequest(server);


import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { AppLogger, AppModule } from './app.module';
import * as functions from 'firebase-functions';
const expressServer = express();
const createFunction = async (expressInstance): Promise<void> => {
    const app = await NestFactory.create(
        AppModule,
        new ExpressAdapter(expressInstance)
        // {
        //     cors: true,
        //     logger: new AppLogger(),
        // }
    );
    app.enableCors({
        origin: ['https://express-api-bc1da.web.app/','https://express-api-bc1da.firebaseapp.com/']
    });
    await app.init();
};
export const api = functions.https.onRequest(async (request, response) => {
    await createFunction(expressServer);
    expressServer(request, response);
});