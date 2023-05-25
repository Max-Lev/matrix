import { Injectable } from '@nestjs/common';
import { CreateHerodDto } from './dto/create-dashboard.dto';
import { UpdateHeroDto } from './dto/update-dashboard.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HeroModel } from './entities/hero.entity';


@Injectable()
export class HeroesService {

  constructor(@InjectModel('Heroes') private readonly heroesModel: Model<HeroModel>) {
  }

  async findAll():Promise<HeroModel[]> {
    const heroes = await this.heroesModel.find().exec();
    return heroes;
  }

  create(createDashboardDto: CreateHerodDto) {
    return 'This action adds a new dashboard';
  }

  findOne(id: number) {
    return `This action returns a #${id} dashboard`;
  }

  update(id: number, updateDashboardDto: UpdateHeroDto) {
    return `This action updates a #${id} dashboard`;
  }

  remove(id: number) {
    return `This action removes a #${id} dashboard`;
  }
}
