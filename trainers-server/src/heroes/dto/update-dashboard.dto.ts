import { PartialType } from '@nestjs/mapped-types';
import { CreateHerodDto } from './create-dashboard.dto';

export class UpdateHeroDto extends PartialType(CreateHerodDto) {}
