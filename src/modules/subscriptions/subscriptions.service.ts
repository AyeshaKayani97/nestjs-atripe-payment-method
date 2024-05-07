import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateOneParamsSubscriptionDto, UpdateOneSubscriptionBodyDto } from './dto/update-subscription.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subscriptions } from './schemas/subscriptions.schema';
import { User } from '../users/schemas/user.schema';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    @InjectModel(Subscriptions.name)
    private subsModel: Model<Subscriptions>

  ){}

  // Create ------------------------------------------ 
  async create(body: CreateSubscriptionDto):Promise<{ message: string }> {
    const newSubscription = new this.subsModel(body); 
    await newSubscription.save(); // Save the user to the database
    return { message: 'subscriptions has been created successfully.' };
}

// findAll -------------------------------------------------

async findAll(): Promise<Subscriptions[]> {
  const subs =  await this.subsModel.find();
  return subs;
}

// findOne -------------------------------------------------

  async findOne(id: string) {
   const findSub = await this.subsModel.findById(id);
   return findSub;
  }

  // update -----------------------------------------------

  async update(
    params: UpdateOneParamsSubscriptionDto,
    body: UpdateOneSubscriptionBodyDto,
    user: User): Promise<{ message: string }> {
    const updateSubsObject = {};
    for (const [key, value] of Object.entries(body)) {
        updateSubsObject[`subs.$.${key}`] = value;
    }

    console.log(updateSubsObject, "updateSubsObject");

    const updateSubsDoc = await this.userModel.findOneAndUpdate(
        { '_id': user._id, 'subscriptions._id': params.subsId },
        { "$set": updateSubsObject },
        { new: true }
    );
    console.log(user._id);
    console.log( params.subsId);
 


    console.log(updateSubsDoc, "updateSubsDoc");

    if (!updateSubsDoc) {
        throw new BadRequestException("Invalid subscription id");
    }

    return { message: "Subscription updated successfully" };
}


  async delete(id: string) {
    // console.log(id);
     const deleteSub = await this.subsModel.findByIdAndDelete(id);
    return "Subscription plan has delete successfully";


  }
}
