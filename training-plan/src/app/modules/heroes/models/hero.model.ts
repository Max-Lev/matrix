export class HeroModel {
    _id: string;
    img?: string;
    trainer: string;
    id: string;
    name: string;
    ability: AbilityEnum;
    startDate: string | Date;
    suit: SuitColorEnum;
    startingPower: number;
    currentPower: number;
    trainingCounter:number;
    trainerName?:string;
}

export enum AbilityEnum {
    attacker,
    defender
}
export enum SuitColorEnum {
    white = 'white',
    black = 'black',
    red = 'red'
}
export enum ActionType {
    SELECT = 'SELECT',
    UNSELECT = 'UNSELECT'
}