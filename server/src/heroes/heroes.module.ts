import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HeroesSchema } from './entities/hero.schema';
import { HeroesController } from './heroes.controller';
import { HeroesService } from './heroes.service';
import { OptionsSchema } from './entities/options.schema';
import { UserSchema } from 'src/users/models/user.schema';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Heroes', schema: HeroesSchema }]),
    MongooseModule.forFeature([{ name: 'Options', schema: OptionsSchema }]),
  ],
  controllers: [HeroesController],
  providers: [
    HeroesService
  ]
})
export class HeroesModule {
  constructor() {

  }
}
