import { Type } from "class-transformer";
import { IsOptional, IsDate } from "class-validator";

export class UpdateUserDeviceDto {
  @Type(() => Date)
  @IsDate()
  ownerStartDate: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  ownerEndDate?: Date;
}