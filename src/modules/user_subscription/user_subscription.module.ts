import { Module } from '@nestjs/common';
import { UserSubscriptionService } from './user_subscription.service';
import { UserSubscriptionController } from './user_subscription.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSubscription, UserSubscriptionSchema } from './schemas/userSubscription.schema';
import { User, UserSchema } from '../users/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([
    { name: UserSubscription.name, schema: UserSubscriptionSchema  },
    { name: User.name, schema: UserSchema  },
  ])],
  controllers: [UserSubscriptionController],
  providers: [UserSubscriptionService, JwtService],
  exports: [UserSubscriptionService],
})
export class UserSubscriptionModule {}
