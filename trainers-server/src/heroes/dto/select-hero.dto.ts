import { PartialType } from '@nestjs/mapped-types';
import { CreateHerodDto } from './create-hero.dto';
import { HeroModel } from '../entities/hero.entity';

export class SelectHeroDto extends PartialType(CreateHerodDto) {
    constructor(payload: SelectHeroRequest) {
        super();
        Object.assign(this, payload.hero);
        this.trainer = payload.user._id;
        console.log('UpdateHeroDto ', this);
    }
}

export interface SelectHeroRequest {
    user: { _id: string };
    hero: HeroModel;
    action: ActionType;
}

export enum ActionType {
    select = 'SELECT',
    unselect = 'UNSELECT'
}