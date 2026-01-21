import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional } from "class-validator";

@InputType()
export class CreateUserDto {
  @Field()
  @IsEmail({}, { message: 'Not valid email' })
  @IsNotEmpty({ message: 'Mandatory Email' })
  email: string;

  @Field()
  @IsString({ message: 'String Password'})
  @IsNotEmpty({message: 'Mandatory Password'})
  password: string;

  @Field() 
  @IsString({ message: 'Name must be string' })
  @IsNotEmpty({ message: 'Mandatory name' })
  @MinLength(2, { message: 'At least 2 char' })
  fullname: string;
}
