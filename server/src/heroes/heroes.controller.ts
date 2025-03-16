import { Controller, Get, Post, Body, Query, UseGuards, Logger, UseInterceptors } from '@nestjs/common';
import { SelectHeroRequest, SelectHeroDto } from './dto/select-hero.dto';
import { HeroModel } from './entities/hero.entity';
import { HeroesService } from './heroes.service';
import { OptionsModel } from './entities/options.schema';
import { JWTAuthGuard } from 'src/auth/guard/auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { CacheInterceptor } from '@nestjs/cache-manager';
// @UseGuards(JWTAuthGuard)
// @UseInterceptors(CacheInterceptor)
@Controller('heroes')
export class HeroesController {
  constructor(private readonly heroesService: HeroesService) { }


  @Get('getAllHeroes')
  getAllHeroes() {
    return this.heroesService.getAllHeroes();
  }

  @Post()
  async create(@Body() hero: HeroModel): Promise<HeroModel> {
    Logger.log('users post: ',hero)
    return this.heroesService.create(hero);
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
    Logger.log('selectHero',payload)
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
