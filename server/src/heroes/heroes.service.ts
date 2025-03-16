import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateHerodDto } from './dto/create-hero.dto';
import { ActionType, SelectHeroDto, SelectHeroRequest } from './dto/select-hero.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HeroModel } from './entities/hero.entity';
import { UpdateHero } from './dto/update-hero.dto';
import { OptionsModel } from './entities/options.schema';
import { logger } from 'firebase-functions/v1';
import { User } from 'src/users/models/user.interface';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from '@nestjs/cache-manager';

@Injectable()
export class HeroesService {

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    // private cacheManager: Cache,
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Heroes') private readonly heroesModel: Model<HeroModel>,
    @InjectModel('Options') private readonly optionsModel: Model<OptionsModel>) {
  }


  create(hero: HeroModel) {
    const _hero = new this.heroesModel(hero);
    return _hero.save();
  }

  async getAllHeroes(): Promise<HeroModel[]> {
    const cachedHeroes = await this.cacheManager.get<HeroModel[]>('heroes');
    if (cachedHeroes) {
      logger.log('Returning cached heroes');
      return this.setTrainerNameAll(cachedHeroes);
    }

    const heroes = await this.heroesModel.find().exec();
    const plainHeroes = heroes.map(hero => hero.toObject());
    
    // Store in cache with TTL (e.g., 5 minutes)
    logger.log('Returning heroes from DB');
    await this.cacheManager.set('heroes', plainHeroes, (1*60*300));
    return this.setTrainerNameAll(heroes);
    
  }

  // This function sets the trainer name for all heroes in the array
  private async setTrainerNameAll(heroes: HeroModel[]): Promise<HeroModel[]> {
    // Map through the heroes array and set the trainer name for each hero
    const heroesWithTrainerNames = await Promise.all(
      heroes.map(async (hero) => {
        // If the hero has a trainer
        if (hero.trainer) {
          // Find the user by their ID
          const user = await this.userModel.findById(hero.trainer).exec();
          // Assign the user's email to the hero's trainerName property
          hero.trainerName = user?.email || null; // Assign here
        }
        // Return the modified hero
        return hero; // Return modified hero
      })
    );
    // Return the array of heroes with their trainer names set
    return heroesWithTrainerNames;
  }

  private async setSelectedTrainerName(user: { _id: string }): Promise<User> {
    return await this.userModel.findById(user._id).exec();
  }


  async getHeroSuits(): Promise<OptionsModel[]> {
    return await this.optionsModel.db.collection('hero-suits').find({}).toArray().then();
  }

  async getHeroAbilities(): Promise<OptionsModel[]> {
    return await this.optionsModel.db.collection('hero-abilities').find({}).toArray().then();
  }

  async selectHero(payload: SelectHeroRequest): Promise<SelectHeroDto> {

    let doc;

    if (payload.action === ActionType.select) {

      const setTrainerName = await this.setSelectedTrainerName(payload.user)

      doc = await this.heroesModel.findByIdAndUpdate({ _id: payload.hero._id },
        {
          trainer: payload.user._id,
          trainingCounter: 0,
          startingPower: +(Math.random() * 10).toFixed(2),
          trainerName: setTrainerName.email
        },
        { returnOriginal: false }
      ).exec();
      
      Logger.log('selectHero if: ', doc);

    } else if(payload.action === ActionType.unselect) {

      const hero = new CreateHerodDto(null);

      doc = await this.heroesModel.findByIdAndUpdate({ _id: payload.hero._id }, { ...hero, ...{ trainerName: null } },
        { returnOriginal: false }).exec();

      Logger.log('selectHero else: ', doc);
    }

    await doc.save();

    return doc;
  }


  async getHeroesByTrainerId(id: string) {
    console.log('getHeroesByTrainerId id: ', id);
    const trainer = await this.heroesModel.find({ trainer: id }).exec();
    logger.warn('trainer: ', trainer);
    return trainer;
  }

  async updateHero(hero: HeroModel) {

    const updateHero = new UpdateHero(hero);

    const doc = await this.heroesModel.findByIdAndUpdate({ _id: hero._id }, { ...updateHero },
      { returnOriginal: false }).exec();

    console.log('updateHero doc', doc);
    return doc.save();

  }

}
