import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { SelectHeroRequest, SelectHeroDto } from './dto/select-hero.dto';
import { HeroModel } from './entities/hero.entity';
import { HeroesService } from './heroes.service';
import { OptionsModel } from './entities/options.schema';
import { JWTAuthGuard } from 'src/auth/guard/auth.guard';
import { AuthGuard } from '@nestjs/passport';
@UseGuards(JWTAuthGuard)
@Controller('heroes')
export class HeroesController {
  constructor(private readonly heroesService: HeroesService) { }


  @Get('getAllHeroes')
  getAllHeroes() {
    return this.heroesService.getAllHeroes();
  }

  @Get('getHeroSuits')
  async getHeroSuits(): Promise<OptionsModel | any> {
    return await this.heroesService.getHeroSuits();
  }
  @Get('getHeroAbilities')
  async getHeroAbilities(): Promise<OptionsModel | any> {
    return await this.heroesService.getHeroAbilities();
  }

  @Post('selectHero')
  async selectHero(@Body() payload: SelectHeroRequest): Promise<SelectHeroDto> {
    return await this.heroesService.selectHero(payload);
  }

  @Get('getHeroesByTrainerId')
  async getHeroesByTrainerId(@Query() query) {
    return this.heroesService.getHeroesByTrainerId(query.id)
  }

  @Post('updateHero')
  async updateHero(@Body() hero: HeroModel) {
    console.log('updateHero ',hero);
    return await this.heroesService.updateHero(hero);
  }

  
}
