import mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CatalogDocument = Catalog & Document;

@Schema({ toJSON: { virtuals: true }, timestamps: true })
export class Catalog {
  @Prop({ auto: true })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, default: '' })
  description: string;

  @Prop({ type: String, default: '' })
  url: string;

  @Prop({ type: Number, default: 0 })
  cost1: number;

  @Prop({ type: Number, default: 0 })
  cost2: number;

  @Prop({ type: Number, default: 0 })
  cost3: number;

  @Prop({ type: Number, default: 0 })
  req1: number;

  @Prop({ type: Number, default: 0 })
  req2: number;

  @Prop({ type: Number, default: 0 })
  req3: number;

  @Prop({ type: Number, default: 0 })
  category: number;
}

const CatalogSchema = SchemaFactory.createForClass(Catalog);

export { CatalogSchema };
