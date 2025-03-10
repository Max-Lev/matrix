import { NestFactory } from "@nestjs/core";
import { ExpressAdapter } from "@nestjs/platform-express";
import { onRequest } from "firebase-functions/https";
import { AppModule } from "./app.module";
import * as express from 'express';
const cors = require("cors");

const createFunction = async (expressServer: express.Express) => {

    const app = await NestFactory.create(
        AppModule,
        new ExpressAdapter(expressServer),
        { cors: true },

    );
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
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*'); // Change to specific domain for security
        res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.header('Access-Control-Allow-Credentials', 'true');
        if (req.method === 'OPTIONS') {
            return res.sendStatus(204);
        }
        next();
    });
    await app.init();
};

export const api2 = onRequest({ region: 'us-central1' },
    async (req, res) => {
        const expressServer = express(); // Create a fresh instance for each request
        await createFunction(expressServer);
        expressServer(req, res);
    }
);

