

import { IsArray, IsBoolean, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class   UpdateOneParamsSubscriptionDto {
  @IsNotEmpty()
  @IsMongoId()
  subsId: string;
}

export class UpdateOneSubscriptionBodyDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsString()
  duration?:string

  @IsOptional()
  @IsArray()
  @IsString({each:true})
  features?: string[];

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
