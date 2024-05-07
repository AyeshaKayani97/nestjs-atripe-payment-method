import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserSubscriptionDto } from './dto/create-user_subscription.dto';
import { UpdateUserSubscriptionDto } from './dto/update-user_subscription.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/schemas/user.schema';
import { UserSubscription } from './schemas/userSubscription.schema';

@Injectable()
export class UserSubscriptionService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    @InjectModel(UserSubscription.name)
    private userSubsModel: Model<UserSubscription>,
  ) {}

  //
  async create(
    body: CreateUserSubscriptionDto,
    user: User,
  ): Promise<{ message: string }> {
    const { user_id, subs_id, isActive } = body;
    const existingSubsId = await this.userSubsModel.findOne({
      subs_id: subs_id,
    });
    if (existingSubsId) {
      throw new UnauthorizedException(
        'your have already subscribed to this plan',
      );
    }
    // If no subscription document exists, create a new one
    const userSubs = new this.userSubsModel({
      user_id: user._id,
      subs_id: subs_id, // Create an array with the new subscription id
      isActive,
    });
    await userSubs.save();

    return { message: 'You have subscribed to this plan successfully' };
  }

  findAll() {
    return `This action returns all userSubscription`;
  }

  async findOne(id: string, user: User) {
    console.log(id);
    console.log(user._id);
    const findUserSubs = await this.userSubsModel.findById({
      _id: id,
      user_id: user._id,
    });
    console.log(findUserSubs);
    return findUserSubs;
  }

  update(id: number, updateUserSubscriptionDto: UpdateUserSubscriptionDto) {
    return `This action updates a #${id} userSubscription`;
  }

  remove(id: number) {
    return `This action removes a #${id} userSubscription`;
  }
}
