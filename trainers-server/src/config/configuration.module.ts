import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configuration';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
            envFilePath: process.env.NODE_ENV === 'production' ? 'environments/production.env' : 'environments/development.env',
        }),
    ],
    providers: [ConfigService],
    exports: [ConfigService],
})
export class ConfigurationModule { }