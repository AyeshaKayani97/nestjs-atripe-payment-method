
import { Prop, Schema as mongoSchema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Schema } from 'mongoose';
import { Subscriptions } from 'src/modules/subscriptions/schemas/subscriptions.schema';
import { User } from 'src/modules/users/schemas/user.schema';

@mongoSchema({ timestamps: true })
export class UserSubscription extends Document {


  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user_id:User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Subscriptions' })
  subs_id:Subscriptions;


  @Prop({default: false })
  isActive: boolean;
}

export const UserSubscriptionSchema: Schema<UserSubscription> = SchemaFactory.createForClass(UserSubscription);
