export class HeroModel {
    _id: string;
    trainer: string;
    id: string;
    name: string;
    img: string;
    ability: AbilityEnum;
    startDate: Date;
    suit: SuitColorEnum;
    startingPower: number;
    currentPower: number;
    trainingCounter: number;
}

export enum AbilityEnum {
    attacker = 1,
    defender = 2
}
export enum SuitColorEnum {
    white = 3,
    black = 2,
    red = 1
}
