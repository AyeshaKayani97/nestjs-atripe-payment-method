import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Todo extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ default: false })
  isCompleted?: boolean;
}

export const TodoScehma = SchemaFactory.createForClass(Todo);