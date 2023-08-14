import { IsNumber, IsString } from 'class-validator';

export class CreateCatalogDto {
  @IsNumber()
  count: number;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  url: string;

  @IsNumber()
  cost1: number;

  @IsNumber()
  cost2: number;

  @IsNumber()
  cost3: number;

  @IsNumber()
  req1: number;

  @IsNumber()
  req2: number;

  @IsNumber()
  req3: number;

  @IsNumber()
  category: number;
}
