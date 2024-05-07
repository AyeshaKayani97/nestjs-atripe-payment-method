

import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";

export class CreateUserSubscriptionDto {

// @IsNotEmpty()
// @IsMongoId()
user_id:string;

@IsNotEmpty()
@IsString()
subs_id:string;



@IsBoolean()
@IsOptional()   
isActive?:boolean
    
}
