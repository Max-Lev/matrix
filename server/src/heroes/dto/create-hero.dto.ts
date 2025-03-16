import { SuitColorEnum, AbilityEnum, HeroModel } from '../entities/hero.entity';
import { ActionType } from './select-hero.dto';

export class CreateHerodDto {
    _id: string;
    id: string;
    name: string;
    trainer: string;
    img: string;
    suit: SuitColorEnum;
    ability: AbilityEnum;
    action: ActionType;
    startingPower: number;
    currentPower: number;
    startDate: Date;
    trainingCounter: number;
    constructor(hero: HeroModel) {

        this.trainer = null;//hero?.trainer || null;

        this.startDate = null;//hero?.startDate || null;

        // this.startingPower = null;//hero?.startingPower || null;

        // this.currentPower = null;//hero?.currentPower || null;

        this.suit = null;//hero?.suit || null;

        this.ability = null;//hero?.ability || null;

        this.trainingCounter = 0;// hero?.trainingCounter || 0;

        this.startingPower = null;

        this.currentPower = null;

    }
}
