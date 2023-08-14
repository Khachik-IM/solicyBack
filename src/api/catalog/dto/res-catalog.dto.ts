import { ObjectId } from 'mongoose';

export class FormattedCatalogDto {
  id: ObjectId;
  name: string;
  description: string;
  price: {
    cost1: number;
    cost2: number;
    cost3: number;
  };
  req: {
    req1: number;
    req2: number;
    req3: number;
  };
}
