import { IsMongoId, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class BuyProductDto {
  @IsString()
  @IsMongoId()
  id: ObjectId;

  @IsString()
  address: string;
}
