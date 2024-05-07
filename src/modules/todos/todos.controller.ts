import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { TodosService } from './todos.service';
import { AuthGuard } from '../../guards/auth.guard';
import { CreateTodoDto } from './dto/create.dto';
import { UserDecorator } from '../../decorators/user.decorator';
import { User } from '../users/schemas/user.schema';
import { UpdateOneBodyDto, UpdateOneParamsDto } from './dto/update.dto';
import { Todo } from './schemas/todo.schema';

@UseGuards(AuthGuard)
@Controller('todos')
export class TodosController {
  constructor(
    private todoService: TodosService,
  ) {
  }

  @Post()
  create(@Body() body: CreateTodoDto, @UserDecorator() user: User): Promise<{ message: string }> {
    return this.todoService.create(body, user);
  }

  @Get()
  findAll(@UserDecorator() user: User): Todo[] {
    return this.todoService.findAll(user);
  }

  @Patch('/:todoId')
  updateOne(@Param() params: UpdateOneParamsDto,
            @Body() body: UpdateOneBodyDto,
            @UserDecorator() user: User): Promise<{ message: string }> {
    return this.todoService.updateOne(params, body, user);
  }
}
