import { AbilityEnum, ActionType, HeroModel, SuitColorEnum } from './hero.model';

export interface Action {
    hero: HeroModel;
}

export interface UpdateHeroAction extends Action {
    payload: {
        startDate?: string | Date,
        ability?: AbilityEnum,
        suit?: SuitColorEnum,
        startingPower?: number,
        currentPower?: number,
        trainer?: string,
        trainingCounter?: number
    };
}

export interface SelectHeroAction extends Action {
    action: ActionType;
}
