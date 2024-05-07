import { Prop, Schema as mongoSchema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Schema } from 'mongoose';

@mongoSchema({ timestamps: true })
export class Subscriptions extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({required:true})
  price:number;

  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  // user_id:User;

  @Prop({ required: true })
  duration: string;

  @Prop({ required:true })
  features: string[];

  // @Prop({default: false })
  // isActive: boolean;
}

export const SubscriptionsSchema: Schema<Subscriptions> = SchemaFactory.createForClass(Subscriptions);
