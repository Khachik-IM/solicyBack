import mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.schema';

export type ProductDocument = Product & Document;

@Schema({ toJSON: { virtuals: true }, timestamps: true })
export class Product {
  @Prop({ auto: true })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ type: String, default: '' })
  name: string;

  @Prop({ type: String, default: null, ref: User.name })
  address: string;
}

const ProductSchema = SchemaFactory.createForClass(Product);

export { ProductSchema };
