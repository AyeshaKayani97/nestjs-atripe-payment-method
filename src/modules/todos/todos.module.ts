import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { Todo, TodoScehma } from './schemas/todo.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: User.name, schema: UserSchema },
    { name: Todo.name, schema: TodoScehma },
  ])],
  providers: [TodosService, JwtService],
  controllers: [TodosController],
})
export class TodosModule {
}
