
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import mongoose from "mongoose";

export class CreateSubscriptionDto {

    @IsString()
    @IsNotEmpty()
    name:string;


    @IsNumber()
    @IsNotEmpty()
    price:number

    // month, year
    @IsString()
    @IsNotEmpty()
    duration:string

    @IsArray()
    @IsString({each:true})
    @IsNotEmpty()
    features:string[]


//     @IsNotEmpty()
//   user_id: mongoose.Schema.Types.ObjectId;


    // @IsBoolean()
    // @IsOptional()   
    // isActive?:boolean
    
}
