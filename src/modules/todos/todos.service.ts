import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTodoDto } from './dto/create.dto';
import { User } from '../users/schemas/user.schema';
import { Todo } from './schemas/todo.schema';
import { UpdateOneBodyDto, UpdateOneParamsDto } from './dto/update.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    @InjectModel(Todo.name)
    private todoModel: Model<Todo>,
  ) {
  }

  async create(body: CreateTodoDto, user: User): Promise<{ message: string }> {
    const todo = new this.todoModel(body);
    user.todos.push(todo);
    await user.save();
    return { message: 'Todo created successfully.' };
  }

  findAll(user: User): Todo[] {
    return user.todos;
  }

  async updateOne(params: UpdateOneParamsDto,
                  body: UpdateOneBodyDto,
                  user: User): Promise<{ message: string }> {
    const updateTodoObject = {};
    for (const [key, value] of Object.entries(body)) {
      updateTodoObject[`todos.$.${key}`] = value;
    }

    const updatedTodoDoc = await this.userModel.findOneAndUpdate(
      { '_id': user._id, 'todos._id': params.todoId },
      { '$set': updateTodoObject },
      { new: true },
    );

    console.log(updatedTodoDoc);

    if (!updatedTodoDoc) {
      throw new BadRequestException('Invalid todo id.');
    }

    return { message: 'Todo updated successfully.' };
  }
}
