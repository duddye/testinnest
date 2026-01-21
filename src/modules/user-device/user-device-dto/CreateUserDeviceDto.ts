import { Field, InputType, Int } from "@nestjs/graphql";
import { Type } from "class-transformer";
import { IsNumber, IsNotEmpty, IsOptional, IsDate } from "class-validator";

@InputType()
export class CreateUserDeviceDto {
  @Field(() => Int)
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @Field(() => Int) 
  @IsNumber()
  @IsNotEmpty()
  deviceId: number;

  @Field(() => Date)
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  ownerStartDate: Date;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  ownerEndDate?: Date;
}