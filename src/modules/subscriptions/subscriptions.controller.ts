import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateOneParamsSubscriptionDto, UpdateOneSubscriptionBodyDto } from './dto/update-subscription.dto';
import { User } from '../users/schemas/user.schema';
import { UserDecorator } from 'src/decorators/user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';


// @UseGuards(AuthGuard)
@Controller('subscriptions')
export class SubscriptionsController {
  constructor(

    private readonly subscriptionsService: SubscriptionsService
  
  ) {}

  @Post()
  create(
    @Body() body: CreateSubscriptionDto) : Promise<{ message: string }> {

    return this.subscriptionsService.create(body);
  }


  // findAll -------------

  @Get()
  findAll() {
    return this.subscriptionsService.findAll();
  }

  // Find one ------------------

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subscriptionsService.findOne(id);
  }

  @Patch('/:subsId')
  async update(
    @Param() params: UpdateOneParamsSubscriptionDto,
     @Body() body : UpdateOneSubscriptionBodyDto,
     @UserDecorator() user: User
  
  ):Promise<{message:string}>
   {

    return this.subscriptionsService.update(params, body, user);
  }

  @Delete(':id')
  delete
  (@Param("id") id: string,



) {
    return this.subscriptionsService.delete(id);
  }
}
