import { Injectable } from '@nestjs/common';
import { CreateHerodDto } from './dto/create-hero.dto';
import { ActionType, SelectHeroDto, SelectHeroRequest } from './dto/select-hero.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HeroModel } from './entities/hero.entity';
import { UpdateHero } from './dto/update-hero.dto';
import { OptionsModel } from './entities/options.schema';

@Injectable()
export class HeroesService {

  constructor(@InjectModel('Heroes') private readonly heroesModel: Model<HeroModel>,
    @InjectModel('Options') private readonly optionsModel: Model<OptionsModel>) {
  }

  async getAllHeroes(): Promise<HeroModel[]> {
    const heroes = await this.heroesModel.find().exec();
    return heroes;
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

      doc = await this.heroesModel.findByIdAndUpdate({ _id: payload.hero._id },
        {
          trainer: payload.user._id,
          trainingCounter: 0,
          startingPower: +(Math.random() * 10).toFixed(2)
        },
        { returnOriginal: false }
      ).exec();

    } else {

      const hero = new CreateHerodDto(null);

      doc = await this.heroesModel.findByIdAndUpdate({ _id: payload.hero._id }, { ...hero },
        { returnOriginal: false }
      ).exec();
    }

    await doc.save();

    return doc;
  }


  async getHeroesByTrainerId(id: string) {
    return await this.heroesModel.find({ trainer: id }).exec();
  }

  async updateHero(hero: HeroModel) {

    const updateHero = new UpdateHero(hero);

    const doc = await this.heroesModel.findByIdAndUpdate({ _id: hero._id }, { ...updateHero },
      { returnOriginal: false }).exec();

    console.log('updateHero doc', doc);
    return doc.save();

  }

}
