import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateUserDto {
  @IsString()
  address: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  cash1?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  cash2?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  cash3?: number;
}
