import { InputType, Field } from "@nestjs/graphql";
import { IsString, IsNotEmpty, MinLength} from "class-validator";

@InputType()
export class UpdateDeviceDto {
  @Field()
  @IsString({ message: 'Name must be string' })
  @IsNotEmpty({ message: 'Mandatory name' })
  @MinLength(2, { message: 'At least 2 char' })
  name: string;
}