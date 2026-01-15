import { Type } from "class-transformer";
import { IsNumber, IsNotEmpty, IsOptional, IsDate } from "class-validator";

export class CreateUserDeviceDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  deviceId: number;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  ownerStartDate: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  ownerEndDate?: Date;
}