import { Prop, Schema as mongoSchema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema } from 'mongoose';
import { Todo } from '../../todos/schemas/todo.schema';
import { Subscriptions } from 'src/modules/subscriptions/schemas/subscriptions.schema';

@mongoSchema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ unique: true, index: true, message: 'Duplicated Email.' })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: null })
  forgotPasswordToken: string | null;

  @Prop({ type: [Todo], default: [] })
  todos: Todo[];


  // @Prop({ type: [Subscriptions], default: null})
  // subscriptions:Subscriptions;
}

export const UserSchema: Schema<User> = SchemaFactory.createForClass(User);
