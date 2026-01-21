import { Field, InputType } from "@nestjs/graphql";
import { IsString, IsNotEmpty, MinLength, IsEmail } from "class-validator";

@InputType()
export class CreateDeviceDto {
  @Field()
  @IsString({ message: 'Name must be string' })
  @IsNotEmpty({ message: 'Mandatory name' })
  @MinLength(2, { message: 'At least 2 char' })
  name: string;

  @Field()
  @IsString()  // TYPE SHOULD EXISTS IN DB
  type: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Mandatory SN' })
  //@MinLength(10, { message: 'At least 10 char' })
  serialNumber: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  userEmail: string;
}

