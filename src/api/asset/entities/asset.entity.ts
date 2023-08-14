import { ObjectId } from 'mongoose';

export class Asset {
  _id: ObjectId;
  type: number;
  level: number;
  address: string;
}
