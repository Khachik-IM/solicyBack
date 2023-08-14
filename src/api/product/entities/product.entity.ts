import { ObjectId } from 'mongoose';

export class Product {
  _id: ObjectId;
  name: string;
  address: string;
}
