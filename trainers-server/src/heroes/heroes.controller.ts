import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { HeroesService } from './heroes.service';
import { CreateHerodDto } from './dto/create-dashboard.dto';
import { UpdateHeroDto } from './dto/update-dashboard.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('heroes')
export class HeroesController {
  constructor(private readonly dashboardService: HeroesService) { }

  
  @Get('findAll')
  @UseGuards(AuthGuard('jwt'))
  // @UseGuards(AuthGuard('google'))
  findAll() {
    return this.dashboardService.findAll();
  }


  @Post(':id')
  selectHeroes() {

  }

  // @Post()
  // create(@Body() createDashboardDto: CreateDashboardDto) {
  //   return this.dashboardService.create(createDashboardDto);
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.dashboardService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateDashboardDto: UpdateDashboardDto) {
  //   return this.dashboardService.update(+id, updateDashboardDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.dashboardService.remove(+id);
  // }
}
