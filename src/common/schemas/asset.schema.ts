import mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.schema';

export type AssetDocument = Asset & Document;

@Schema({ toJSON: { virtuals: true }, timestamps: true })
export class Asset {
  @Prop({ auto: true })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ type: Number, enum: [1, 2, 3] })
  type: number;

  @Prop({ type: Number, min: 1, max: 10 })
  level: number;

  @Prop({ type: String, default: null, ref: User.name })
  address: string;
}

const AssetSchema = SchemaFactory.createForClass(Asset);

export { AssetSchema };
