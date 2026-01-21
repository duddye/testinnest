import { Field, InputType } from "@nestjs/graphql";
import { Type } from "class-transformer";
import { IsOptional, IsDate } from "class-validator";

@InputType()
export class UpdateUserDeviceDto {
  @Field(() => Date)
  @Type(() => Date)
  @IsDate()
  ownerStartDate: Date;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  ownerEndDate?: Date;
}