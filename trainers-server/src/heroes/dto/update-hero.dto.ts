import { PartialType } from '@nestjs/mapped-types';
import { CreateHerodDto } from './create-hero.dto';
import { HeroModel } from '../entities/hero.entity';

export class UpdateHero extends PartialType(CreateHerodDto) {
    constructor(hero: HeroModel) {
        super();
        Object.assign(this, hero);
        console.log('UpdateHero this', this);

    }
}