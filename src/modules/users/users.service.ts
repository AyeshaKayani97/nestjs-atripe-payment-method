import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {
  }

  async create(body: CreateUserDto): Promise<User> {
    return await this.userModel.create(body);
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async findOne(filterFields: object): Promise<User> {
    return this.userModel.findOne(filterFields);
  }

  async updateOne(email: string, updateFields: object): Promise<void> {
    await this.userModel.updateOne({ email }, updateFields);
  }
}
