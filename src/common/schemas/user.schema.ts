import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema({ toJSON: { virtuals: true }, timestamps: true })
export class User {
  @Prop({ unique: true, required: true })
  address: string;

  @Prop({ type: Number, default: 0 })
  cash1?: number;

  @Prop({ type: Number, default: 0 })
  cash2?: number;

  @Prop({ type: Number, default: 0 })
  cash3?: number;
}

const UserSchema = SchemaFactory.createForClass(User);

export { UserSchema };
