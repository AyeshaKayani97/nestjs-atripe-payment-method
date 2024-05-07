import { Module } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionsController } from './subscriptions.controller';
import { Subscriptions, SubscriptionsSchema } from './schemas/subscriptions.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';

import { User, UserSchema } from '../users/schemas/user.schema';

@Module({
  imports:[
    MongooseModule.forFeature([
    { name: User.name, schema: UserSchema },
    { name: Subscriptions.name, schema: SubscriptionsSchema },
  ])],
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService, JwtService],
})
export class SubscriptionsModule {}
