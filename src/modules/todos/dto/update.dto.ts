import { IsBoolean, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateOneParamsDto {
  @IsNotEmpty()
  @IsMongoId()
  todoId: string;
}

export class UpdateOneBodyDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;
}