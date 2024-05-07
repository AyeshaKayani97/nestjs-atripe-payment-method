import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserSubscriptionService } from './user_subscription.service';
import { CreateUserSubscriptionDto } from './dto/create-user_subscription.dto';
import { UpdateUserSubscriptionDto } from './dto/update-user_subscription.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { UserDecorator } from 'src/decorators/user.decorator';
import { User } from '../users/schemas/user.schema';

@UseGuards(AuthGuard)
@Controller('user-subscription')
export class UserSubscriptionController {
  constructor(
    private readonly userSubscriptionService: UserSubscriptionService,
  ) {}

  @Post()
  create(@Body() body: CreateUserSubscriptionDto, @UserDecorator() user: User) {
    return this.userSubscriptionService.create(body, user);
  }

  @Get()
  findAll() {
    return this.userSubscriptionService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @UserDecorator() user:User
  
  ) {
    return this.userSubscriptionService.findOne(id, user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserSubscriptionDto: UpdateUserSubscriptionDto,
  ) {
    return this.userSubscriptionService.update(+id, updateUserSubscriptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userSubscriptionService.remove(+id);
  }
}
